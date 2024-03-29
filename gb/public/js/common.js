const data = { loaded: false, selected: null, status: null, video: null, weight: 3, size: 16, color: '#999', clips: [] }

const Drawing = class {
  constructor (target) { this._target = document.createElementNS('http://www.w3.org/2000/svg', target) }
  get () { return this._target }
  set ({x, y}, target = this._target) {
    setAttr(target, { 'stroke': data.color, 'stroke-width': data.weight, 'fill': 'none' })
    this._x = x, this._y = y
  }
  drawing () {}
  end () { drawEnd(this._target) }
}
const Line = class extends Drawing {
  constructor ({x, y}) { super('path'); this.set({x, y}) }
  set ({x ,y }) { super.set({x, y}); setAttr(this._target, {d: `M${x} ${y}`, 'stroke-linecap': 'round'}) }
  drawing ({x, y}) { this._target.attributes.d.value += `L${x} ${y} ` }
}
const Rect = class extends Drawing {
  constructor ({ x, y }) { super('rect'); this.set({x, y}) }
  set ({ x, y }, target = this._target) {
    super.set({x, y})
    setAttr(target, {x, y})
  }
  drawing ({ x, y }, target = this._target) {
    const width = x - this._x, height = y - this._y
    const attr = {}
    if (width < 0) attr.x = x
    if (height < 0) attr.y = y
    setAttr(target, {...attr, width: Math.abs(width), height: Math.abs(height)})
  }
  end () { super.end(); this._target.setAttribute('fill', data.color) }
}
const Text = class {
  constructor ({x, y}) {
    this.x = x, this.y = y
    const target = document.createElement('div')
    setAttr(target, {
      contentEditable: true,
      style: `position:absolute;left:${x}px;top:${y}px;font-size:${data.size}px;color:${data.color};z-index:50`
    })
    $(target)
      .on('keydown', e => { if (e.keyCode === 13) e.target.blur() })
      .on('blur', () => { target.remove(); this.end(target.innerHTML) })
      .prependTo('.video-wrap')
    setTimeout(() => target.focus())
  }
  end (text) {
    if (text.length === 0) return
    const target = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    setAttr(target, { 'dominant-baseline': 'hanging', 'x': this.x, 'y': this.y+3, 'fill': data.color, 'font-size': data.size })
    target.innerHTML = text
    $('.video-wrap svg').append(target)
    drawEnd(target)
  }
}
const setAttr = (target, attr) => { for (const key in attr) { target.setAttribute(key, attr[key]) } }
const twoNum = n => `0${n}`.substr(-2)
const timeFormat = t => [~~(t/3600)%24, ~~(t/60)%60, ~~t%60, ~~(t*100)%100].map(v => twoNum(v)).join(':')
const timelineRange = ({start, end, duration}) => `left:${(start/duration) * 100}%;width:${((end - start)/duration) * 100}%`
const timelineRender = arr => {
  const k = arr.length - 1
  const v = arr[k]
  const liText = `
    <li class="bar" data-key="${k}">
      <div data-start="${v.start}" data-end="${v.end}" data-duration="${v.duration}" style="${timelineRange(v)}"></div>
    </li>
  `
  $(liText)
    .prependTo('.timeline ul')
    .find('div')
    .draggable({ axis: "x", containment: "parent", })
    .resizable({ handles: "e, w", containment: 'parent' })
}
const selectEvent = e => {
  e.preventDefault()
  if (data.loaded === false) {
    alert('비디오를 선택해주세요')
    return false
  }
  const $this = $(e.target)
  if ($this.hasClass('active')) return
  const selected = e.target['id']
  switch (true) {
    case selected === 'one' :
      const timeline = $('.timeline')
      const clip = timeline.find('li.active')
      if (clip.length === 0) {
        alert('선택된게 없습니다.')
        return
      }
      const index = clip.data('key')
      $('.clone').remove()
      clip.remove()
      timeline.find('li').each((k, v) => v.setAttribute('data-key', timeline.find('li').length - k - 1))
      data.clips[index].el.remove()
      data.clips.splice(index, 1)
      if (data.clips.length === 0) $('.timeline ul').empty()
    break
    case selected === 'all' :
      data.clips = []
      $('.video-wrap svg').empty()
      $('.timeline ul').empty()
    break
    case selected === 'down' : donwloadVideo(); break
    case $this.hasClass('status') :
      data.video[selected]()
      $this.parent().find('.status.active').removeClass('active')
      $this.addClass('active')
    break
    default :
      $this.parent().find('.draw.active').removeClass('active')
      $this.addClass('active')
      $('.video-wrap svg .active').attr('class', '')
      $('.video-wrap svg .clone').remove()
      $('.timeline li.active').removeClass('active')
      data.selected = selected
    break
  }
}
const selectCover = (() => {
  let timer = null
  return e => {
    clearTimeout(timer)
    $('.video-editor__object .active').removeClass('active')
    $('.timeline').addClass('active')
    const target = e.currentTarget
    const wrap = $('.video-wrap')
    const video = data.video = wrap.find('video')[0]
    video.setAttribute('src', target.dataset.url)
    video.load()
    video.oncanplay = _ => {
      wrap.find('.none').hide()
      data.loaded = true
      $('#duration').html(timeFormat(video.duration))
    }
    timer = setInterval(() => {
      $('#current').html(timeFormat(video.currentTime))
      $('.timeline-current').css({ left: (video.currentTime / video.duration) * 800 + 'px' })
      showClip()
    }, (1000 / 60))
  }
})();
const sortClip = e => {
  const childrens = Array.from(e.target.children)
  const svg = $('.video-wrap svg').empty()
  const keys = childrens.map((v, k) => {
    const now = v.dataset.key
    v.setAttribute('data-key', k)
    return now
  })
  const temp = keys.map(v => data.clips[v])
  data.clips = temp
  temp.forEach(({ el }) => {
    svg.prepend(el)
    if ($(el).attr('d') && $(el).attr('class') === 'active') lineActive($(el))
  })
}
const showClip = () => {
  const { clips } = data
  const { currentTime: t } = data.video
  clips.forEach(({ el, end, start }) => {
    el.style.cssText = start <= t && t <= end ? '' : 'opacity:0;z-index:-1'
  })
}
const selectShape = e => {
  const shape =  $(e.currentTarget)
  const len = $('.timeline li').length - 1
  const clip = $('.timeline li').eq(len - shape.index())
  selectWrapper(clip, shape)
}
const selectClip = e => {
  const clip = e.currentTarget
  const shape = $(data.clips[clip.dataset.key].el)
  selectWrapper($(clip), shape)
}
const selectWrapper = (clip, shape) => {
  const clipChk = clip.hasClass('active')
  const clipRange = $('#clipRange')
  $('#select.draw').click()
  $('.video-wrap svg .active').attr('class', '')
  $('.timeline li.active').removeClass('active')
  clipRange.removeClass('active')
  $('.video-wrap svg path[class="clone"]').remove()
  if (!clipChk) {
    clipRange.addClass('active')
    if (shape.attr('d')) lineActive(shape)
    shape.attr('class', 'active')
    clip.addClass('active')
    const {start, end} = clip.find('div')[0].dataset
    $('#clipStart').html(timeFormat(start))
    $('#clipEnd').html(timeFormat(end))
  }
}
const lineActive = line => {
  const clone = line.clone()
  clone.attr({
    stroke: '#d30513',
    'stroke-width': clone.attr('stroke-width')*1 + 6,
    class: 'clone',
    style: ''
  })
  line.before(clone)
}
const selectOption = (e, {name, value} = e.target) => data[name] = value
const drawEnd = (el, { duration } = data.video, start = 0, end = duration) => {
  data.clips.push({ start, end, duration, el })
  timelineRender(data.clips)
}
const draw = (() => {
  let nowTarget = null
  return e => {
    if ($('.draw.active').length === 0) return
    const { selected } = data
    const topWrap = $('.video-wrap .top')
    if (selected !== 'Text' && nowTarget && nowTarget.end && ['mouseout', 'mouseup'].indexOf(e.type) !== -1) {
      nowTarget.end()
      nowTarget = null
      topWrap.removeClass('active')
      return
    }
    const {pageX, pageY} = e
    const {top, left} = $(e.currentTarget).offset()
    const [x, y] = [pageX - left, pageY - top]
    switch (e.type) {
      case 'mousedown' :
        if (['Line', 'Rect', 'Text'].indexOf(selected) === -1) return
        nowTarget = new ({Line, Rect, Text}[selected])({x, y})
        if (selected === 'Text') return
        e.target.appendChild(nowTarget.get())
        topWrap.addClass('active')
      break
      case 'mousemove' : if (nowTarget && nowTarget.drawing) nowTarget.drawing({x, y}); break
    }
  }
})();
const moveShape = (() => {
  let moving = 0, x, y, target, moveChk = 0
  return e => {
    const moveWrap = $('.video-wrap .move')
    const {pageX, pageY} = e
    switch (`${e.type}${moving}`) {
      case 'mousedown0' :
        moveWrap.addClass('active')
        target = e.currentTarget
        const {beforeX, beforeY} = target.dataset
        moving = 1, x = pageX - (beforeX || 0), y = pageY - (beforeY || 0)
      break
      case 'mousemove1' :
      case 'mousemove2' :
        moving = 2
        const [moveX, moveY] = [pageX - x, pageY - y]
        const clone = $('.video-wrap svg .clone')[0]
        setAttr(target, { 'transform': `translate(${moveX}, ${moveY})`, 'data-before-x': moveX, 'data-before-y': moveY })
        setAttr(clone, { 'transform': `translate(${moveX}, ${moveY})`, 'data-before-x': moveX, 'data-before-y': moveY })
      break
      case 'mouseup1' :
      case 'mouseup2' :
        moveWrap.removeClass('active');
        if (moving === 1) $(target).click();
        moving = 0
      break
    }
  }
})();
const changeClip = e => {
  const target = e.currentTarget
  const clip = data.clips[target.parentNode.dataset.key]
  const duration = target.dataset.duration
  const [left, width] = [target.style.left, target.style.width].map(v => (parseInt(v)/800) * duration)
  const [start, end] = [left, left + width]
  setAttr(target, { 'data-start': (clip.start = start), 'data-end': (clip.end = end) })
  if ($(target.parentNode).hasClass('active')) {
    $('#clipStart').html(timeFormat(start))
    $('#clipEnd').html(timeFormat(end))
  }
}
const moveCurrent = e => {
  const pos = parseInt(e.currentTarget.style.left)
  data.video.currentTime = (pos / 800) * data.video.duration
}
const donwloadVideo = async () => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  data.clips.forEach(({ el, start, end }) => {
    const clone = el.cloneNode(true)
    setAttr(clone, { 'data-start': start, 'data-end': end })
    svg.appendChild(clone)
  })
  setAttr(svg, { width: 800, height: 450 })
  const blob = await fetch(data.video.attributes.src.value).then(res => res.blob())
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = () => {
    let template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <style>
      .wrap{position:relative;width:800px;height:450px;}
      .wrap svg{position:absolute;left:0;top:0;}
      #player{position:absolute;left:50%;top:50%;margin-left:-25px;margin-top:-25px;background:#09F;color:#fff;width:50px;height:50px;display:block;z-index:100;line-height:50px;text-align:center;text-decoration:none;}
      </style>
    </head>
    <body>
      <div class="wrap">
        <a href="#" id="player">재생</a>
        <video src="data:video/mp4;${reader.result.split(';')[1]}" width="800" height="450"></video>
        ${svg.outerHTML}
      </div>
      <script>
        const video = document.querySelector('video')
        const svg = document.querySelector('svg')
        player.onclick = () => {
          video.play()
          player.style.display = 'none'
          return false
        }
        video.ontimeupdate = () => {
          const { currentTime: t } = video
          Array.from(svg.children).forEach(v => {
            const {start, end} = v.dataset
            v.style.cssText = start <= t && t <= end ? '' : 'opacity:0;z-index:-1'
          })
        }
      </script>
    </body>
    </html>
    `
    const htmlBlob = new Blob([template], {type:'text/html'})
    const link = document.createElement('a')
    const date = new Date()
    const yymmdd = [date.getFullYear(), date.getMonth()+1, date.getDate()].map(v => twoNum(v)).join('')
    const target = $(`<a id="videoDown" href="${URL.createObjectURL(htmlBlob)}" download="movie-${yymmdd}"></a>`)
    $('body').append(target)
    target[0].click()
    target.remove()
  }
}
$(_ => {
  if ($('.timeline').length) {
    $('.timeline ul:first-child').sortable()
    $('.timeline-current').draggable({ axis: "x", containment: "parent", })
  }
})
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectEvent)
  .on('click', '.teaser__cover a', selectCover)
  .on('mousedown', '.video-wrap svg', draw)
  .on('mouseup mouseout mousemove', '.video-wrap .top', draw)
  .on('change', '.video-editor__option input', selectOption)
  .on('sortstop', '.timeline ul', sortClip)
  .on('click', '.timeline li', selectClip)
  .on('click', '.video-wrap svg *', selectShape)
  .on('mousedown', '.video-wrap svg [class="active"]', moveShape)
  .on('mouseup mousemove', '.video-wrap .move', moveShape)
  .on('drag resize', '.timeline li>div', changeClip)
  .on('drag', '.timeline-current', moveCurrent)