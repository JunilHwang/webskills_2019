const data = { loaded: false, selected: null, status: null, video: null, weight: 3, size: 16, color: '#999', clips: [] }
const setAttr = (target, attr) => { for (const key in attr) { target.setAttribute(key, attr[key]) } }
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
      const clip = $('.timeline li.active'), index = clip.index()
      if (index === -1) {
        alert('선택된게 없습니다.')
        return
      }
      clip.remove()
      data.clips[index].el.remove()
      data.clips.splice(index, 1)
    break
    case selected === 'all' :
      $('.timeline li').remove()
      data.clips.forEach(v => v.el.remove())
      data.clips = []
    break
    case $this.hasClass('status') :
      data.video[selected]()
      $this.parent().find('.status.active').removeClass('active')
      $this.addClass('active')
    break
    default :
      $this.parent().find('.draw.active').removeClass('active')
      $this.addClass('active')
      $('.video-wrap svg .active').attr('class', '')
      $('.timeline li.active').removeClass('active')
      data.selected = selected
    break
  }
}
const twoNum = n => `0${n}`.substr(-2)
const timeFormat = t => [~~(t/3600)%24, ~~(t/60)%60, ~~t%60, ~~(t*100)%100].map(v => twoNum(v)).join(':')
const selectCover = e => {
  $('.video-editor__object .active').removeClass('active')
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
  video.ontimeupdate = _ => $('#current').html(timeFormat(video.currentTime))
}
const selectOption = (e, {name, value} = e.target) => data[name] = value
const drawEnd = (el, { duration } = data.video, start = 0, end = duration) => {
  data.clips.push({ start, end, duration, el })
  timelineRender(data.clips)
}
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
  set ({x ,y }) { super.set({x, y}); this._target.setAttribute('d', `M${x} ${y}`) }
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
const init = _ => {
  if ($('.timeline').length) $('.timeline').sortable()
}
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
  temp.forEach(({ el }) => svg.append(el))
}
const selectShapeReal = target => {
  const chk = target.attr('class') === 'active'
  $('.video-wrap svg .active').attr('class', '')
  if (!chk) target.attr('class', 'active')
}
const selectClipReal = target => {
  const chk = target.hasClass('active')
  $('.timeline li.active').removeClass('active')
  if (!chk) target.addClass('active')
}
const selectShape = e => {
  const shape =  $(e.currentTarget)
  const clip = $('.timeline li').eq(shape.index())
  selectWrapper(clip, shape)
}
const selectClip = e => {
  const clip = $(e.currentTarget)
  const shape = $(data.clips[clip.index()].el)
  selectWrapper(clip, shape)
}
const selectWrapper = (clip, shape) => {
  $('#select.draw').click()
  selectClipReal(clip)
  selectShapeReal(shape)
}
const moveShape = (() => {
  let moving = false, x, y, target, moveChk = 0
  return e => {
    const moveWrap = $('.video-wrap .move')
    const {pageX, pageY} = e
    switch (e.type) {
      case 'mousedown' :
        moveWrap.addClass('active')
        target = e.currentTarget
        const {beforeX, beforeY} = target.dataset
        moving = true, x = pageX - (beforeX || 0), y = pageY - (beforeY || 0), 
        moveChk = target.getAttribute('transform')
      break
      case 'mousemove' :
        if (!moving) return
        const moveX = pageX - x, moveY = pageY - y
        setAttr(target, { 'transform': `translate(${moveX}, ${moveY})`, 'data-before-x': moveX, 'data-before-y': moveY })
      break
      case 'mouseup' :
        moving = false
        moveWrap.removeClass('active')
        if (moveChk === target.getAttribute('transform')) $(target).click()
      break
    }
  }
})();
const timelineRange = ({start, end, duration}) => `left:${(start/duration) * 100}%;width:${((end - start)/duration) * 100}%`
const timelineRender = arr => {
  $('.timeline').html(arr.map((v, k) => `
      <li data-key="${k}">
        <div data-start="${v.start}" data-end="${v.end}" data-duration="${v.duration}" style="${timelineRange(v)}"></div>
      </li>
  `).join(''))
}
const resizeClip = (() => {
  let resizing = false, beforeX
  return e => {
    const wrap = e.currentTarget
    const target = wrap.children[0]
    switch (e.type) {
      case 'mousemove' :
        let x = e.offsetX + target.offsetLeft
        if (beforeX < e.offsetX) x = e.offsetX
        beforeX = x
        const {end, duration} = target.dataset
        const w = (end / duration) * 800
        if (!resizing) {
          wrap.classList[w-20 < x && x < w ? 'add' : 'remove']('resizing')
        } else {
          const end = (x / 800) * duration
          target.setAttribute('data-end', end)
          target.style.cssText = timelineRange(target.dataset)
          data.clips[$(wrap).index()].end = end
        }
      break;
      case 'mousedown' :
        if (wrap.classList.contains('resizing')) resizing = true
      break
      case 'mouseup' :
      case 'click' :
        if (!resizing) return
        resizing = false
        wrap.click()
      break
    }
  }
})();
const moveClip = (() => {
  let moving = false, beforeX = 0, timeline = null, moved = 0
  return e => {
    const target = e.currentTarget
    const clip = data.clips[$(target).parent().index()]
    const {start, end, duration} = target.dataset
    const {offsetX: ox} = e
    timeline = timeline || $('.timeline')
    switch (e.type) {
      case 'mouseenter' : 
      case 'mouseleave' : timeline.sortable('option', 'disabled', e.type === 'mouseenter'); break
      case 'mousemove' :
        if (moving) {
          const moveX = ((ox - beforeX)/800) * duration
          const moveStart = start*1 + moveX
          const moveEnd = end*1 + moveX
          if (moveStart < 0 || moveEnd > duration) return
          setAttr(target, { 'data-start': (clip.start = moveStart), 'data-end': (clip.end = moveEnd) })
          target.style.cssText = timelineRange(clip)
        }
      break
      case 'mousedown' :
        if (ox > target.clientWidth - 20) return
        moving = true
        moved = clip.start
        beforeX = ox
      break
      case 'mouseup' : moving = false; break
      case 'click' : if (moved !== clip.start) e.stopPropagation(); break;
    }
  }
})();
$(init)
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectEvent)
  .on('click', '.teaser__cover a', selectCover)
  .on('mousedown', '.video-wrap svg', draw)
  .on('mouseup mouseout mousemove', '.video-wrap .top', draw)
  .on('change', '.video-editor__option input', selectOption)
  .on('sortstop', '.timeline', sortClip)
  .on('click', '.timeline li', selectClip)
  .on('click', '.video-wrap svg *', selectShape)
  .on('mousedown', '.video-wrap svg [class="active"]', moveShape)
  .on('mouseup mousemove', '.video-wrap .move', moveShape)
  .on('click mouseup mousedown mousemove', '.timeline li', resizeClip)
  .on('click mouseup mouseenter mouseleave mousedown mousemove', '.timeline div', moveClip)