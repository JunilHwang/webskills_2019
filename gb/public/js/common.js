const data = {
  loaded: false,
  selected: null,
  status: null,
  ctx: null
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
    case $this.hasClass('status') :
      data.status = selected
    break
    case $this.hasClass('event') :

    break
    default :
      $this.parent().find('.active').removeClass('active')
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
  const video = $('video', wrap)[0]
  data.ctx = data.ctx || cvs.getContext('2d')
  $('source', video).attr({ src, type })
  video.load()
  video.oncanplay = e => {
    $('.video-wrap .none').hide()
    if (video.currentTime != 1) video.currentTime = 1
    data.loaded = true
    data.ctx.drawImage(video, 0, 0, 800, 450)
  }
}

$(document)
  .on('click', 'a[href="#"]', _ => false)
  .on('click', '.video-editor__object a', selectObject)
  .on('click', '.teaser__cover a', selectCover)