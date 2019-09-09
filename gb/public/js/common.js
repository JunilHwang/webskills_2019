const data = {
  loaded: false,
  selected: null,
  status: null,
  ctx: null,
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

const selectCover = e => {
  const target = e.currentTarget
  const [src, type] = [target.dataset.url, 'video/mp4']
  const wrap = $('.video-wrap')
  const cvs = $('canvas', wrap)[0]
  const video = data.video = $('video', wrap)[0]
  data.ctx = data.ctx || cvs.getContext('2d')
  $('source', video).attr({ src, type })
  $('.video-editor__object .active').removeClass('active')
  video.load()
  const timer = () => {
    if (video.paused || video.ended) return;
    draw()
    setTimeout(timer)
  }
  const draw = () => data.ctx.drawImage(video, 0, 0, 800, 450)    
  video.addEventListener("play", timer)
  video.addEventListener("canplay", e => {
    $('.video-wrap .none').hide()
    if (video.currentTime === 0) video.currentTime = 0.1
    else {
      data.loaded = true
      draw()
    }
  })
}

$(document)
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectObject)
  .on('click', '.teaser__cover a', selectCover)