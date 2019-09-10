const data = {
  loaded: false,
  selected: null,
  status: null,
  video: null,
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

const draw = e => {
  const video = data.video
  const wrap = $('.video-wrap')
  switch (e.type) {
    case 'mousedown' :
      const {pageX, pageY} = e
      const {top, left} = $(video).offset()
      const [x, y] = [pageX - left, pageY - top]
    break
    case 'mouseout' :
    case 'mouseup' :
    break
    case 'mousemove' :
    break
  }
}

$(document)
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectObject)
  .on('click', '.teaser__cover a', selectCover)
  .on('mousedown mouseup mouseout mousemove', '.video-wrap svg', draw)