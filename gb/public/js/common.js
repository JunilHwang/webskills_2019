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
  set (attr) { for (const key in attr) this._target.setAttribute(key, attr[key])}
  drawing () {}
}
const Line = class extends Drawing {
  constructor () {
    super('path')
    this.d = []
  }
  drawing ({x, y}) {
    const {d} = this._target.attributes
    d.value += `${x} ${y} `
  }
}

let nowTarget = null
const draw = e => {
  const wrap = $('.video-wrap')
  if (['mouseout', 'mouseup', 'touchend'].indexOf(e.type) !== -1) {
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
    case 'touchstart' :
      nowTarget = new Line()
      const {color, weight} = data
      nowTarget.set({
        'd': `M${x} ${y} L`,
        'stroke': color,
        'stroke-width': weight,
        'fill': 'transparent'
      })
      e.target.appendChild(nowTarget.get())
      $('.top', wrap).addClass('active')
    break
    case 'mousemove' :
      if (!nowTarget) return
      nowTarget.drawing({x, y})
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