const data = {
  loaded: false,
  selected: null,
  status: null,
  video: null,
  weight: 3,
  size: 16,
  color: '#999'
}

const selectObject = e => {
  e.preventDefault()
  if (data.loaded === false) {
    alert('비디오를 선택해주세요')
    return false
  }
  const $this = $(e.target)
  if ($this.hasClass('active')) return
  const selected = data.objectType = e.target['id']
  switch (true) {
    case $this.hasClass('event') :
    break
    case $this.hasClass('status') :
      data.video[selected]()
      $this.parent().find('.status.active').removeClass('active')
      $this.addClass('active')
    break
    default :
      $this.parent().find('.draw.active').removeClass('active')
      $this.addClass('active')
      data.selected = selected
    break
  }
}

const twoNum = n => `0${n}`.substr(-2)

const timeFormat = t => {
  const ms = ~~(t * 100) % 100
  const s = ~~t % 60
  const m = ~~(t/60) % 60
  const h = ~~(t/3600) % 24
  return `${twoNum(h)}:${twoNum(m)}:${twoNum(s)}:${twoNum(ms)}`
}

const selectCover = e => {
  const target = e.currentTarget
  const [src, type] = [target.dataset.url, 'video/mp4']
  const wrap = $('.video-wrap')
  const video = data.video = $('video', wrap)[0]
  $('source', video).attr({ src, type })
  $('.video-editor__object .active').removeClass('active')
  video.load()
  video.oncanplay = e => {
    $('.none', wrap).hide()
    data.loaded = true
    $('#duration').html(timeFormat(video.duration))
  }
  video.ontimeupdate = e => {
    $('#current').html(timeFormat(video.currentTime))
  }
}

const selectOption = e => {
  const {name, value} = e.target
  data[name] = value
}

const Drawing = class {
  constructor (target) {
    this._target = document.createElementNS('http://www.w3.org/2000/svg', target)
  }
  get () { return this._target }
  set ({x, y}) {
    const target = this._target
    const {color, weight} = data
    target.setAttribute('stroke', color)
    target.setAttribute('stroke-width', weight)
    target.setAttribute('fill', 'none')
    this._x = x, this._y = y
  }
  drawing () {}
  end () {}
}
const Line = class extends Drawing {
  constructor ({x, y}) { super('path'); this.set({x, y}) }
  set ({x ,y }) {
    super.set({x, y})
    const target = this._target
    target.setAttribute('d', `M${x} ${y}`)
  }
  drawing ({x, y}) {
    const {d} = this._target.attributes
    d.value += `L${x} ${y} `
  }
}
const Rect = class extends Drawing {
  constructor ({ x, y }) { super('rect'); this.set({x, y}) }
  set ({ x, y }) {
    super.set({x, y})
    const target = this._target
    target.setAttribute('x', x)
    target.setAttribute('y', y)
  }
  drawing ({ x, y }) {
    const {_x, _y, _target: target} = this
    const width = x - _x, height = y - _y
    if (width > 0) {
      target.setAttribute('width', width)
    } else {
      target.setAttribute('x', x)
      target.setAttribute('width', -width)
    }
    if (height > 0) {
      target.setAttribute('height', height)
    } else {
      target.setAttribute('y', y)
      target.setAttribute('height', -height)
    }
  }
  end () { this._target.setAttribute('fill', data.color) }
}
const Text = class {
  constructor ({x, y}) {
    const target = document.createElement('div')
    const {size, color} = data
    this.x = x, this.y = y
    target.setAttribute('contentEditable', true)
    target.style.cssText = `position:absolute;left:${x}px;top:${y}px;font-size:${size}px;color:${color};z-index:50`
    target.innerHTML = ''
    $(target)
      .on('keydown', e => { if (e.keyCode === 13) e.target.blur() })
      .on('blur', e => {
        target.remove()
        this.end(e.target.innerHTML)
      })
      .prependTo('.video-wrap')
    setTimeout(() => target.focus())
  }
  end (text) {
    const target = document.createElementNS('http://www.w3.org/2000/svg', 'text')
    const {size, color} = data
    const {x, y} = this
    target.setAttribute('dominant-baseline', 'hanging')
    target.setAttribute('x', x)
    target.setAttribute('y', y+3)
    target.setAttribute('fill', color)
    target.setAttribute('font-size', size)
    target.innerHTML = text
    $('.video-wrap svg').append(target)
  }
}

let nowTarget = null
const draw = e => {
  if ($('.draw.active').length === 0) return false
  const { selected } = data
  const wrap = $('.video-wrap')
  if (selected !== 'Text' && nowTarget && nowTarget.end && ['mouseout', 'mouseup'].indexOf(e.type) !== -1) {
    nowTarget.end()
    nowTarget = null
    $('.top', wrap).removeClass('active')
    return false
  }
  const video = data.video
  const {pageX, pageY} = e
  const {top, left} = $(e.currentTarget).offset()
  const [x, y] = [pageX - left, pageY - top]
  switch (e.type) {
    case 'mousedown' :
      if (['Line', 'Rect', 'Text'].indexOf(selected) !== -1) {
        nowTarget = new ({Line, Rect, Text}[selected])({x, y})
        if (selected !== 'Text') {
          e.target.appendChild(nowTarget.get())
          $('.top', wrap).addClass('active')
        }
      }
    break
    case 'mousemove' :
      if (nowTarget && nowTarget.drawing) nowTarget.drawing({x, y})
    break
  }
}

$(document)
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectObject)
  .on('click', '.teaser__cover a', selectCover)
  .on('mousedown', '.video-wrap svg', draw)
  .on('mouseup mouseout mousemove', '.video-wrap .top', draw)
  .on('change', '.video-editor__option input', selectOption)