<section class="sub-content container teaser">
  <h2 class="content__title">콘테스트 참여하기</h2>
  <div class="video-editor">
    <div class="video-wrap">
      <div class="none"><span class="middle"></span><strong>동영상을 선택해주세요</strong></div>
      <div class="top"></div>
      <div class="move"></div>
      <svg width="800" height="450"></svg>
      <video width="800" height="450"></video>
      <div class="video-wrap__duration">
        <div class="active">
          <span id="current">00:00:00:00</span> /
          <span id="duration">00:00:00:00</span>
        </div>
        <div id="clipRange">
          <span id="clipStart">00:00:00:00</span> /
          <span id="clipEnd">00:00:00:00</span>
        </div>
      </div>
    </div>
    <div class="timeline">
      <ul></ul>
      <span class="timeline-current"></span>
    </div>
    <div class="video-editor__object">
      <a href="#" class="draw" id="Line">자유곡선</a>
      <a href="#" class="draw" id="Rect">사각형</a>
      <a href="#" class="draw" id="Text">텍스트</a>
      <a href="#" class="draw" id="select">선택</a>
      <a href="#" class="status" id="play">재생</a>
      <a href="#" class="status" id="pause">정지</a>
      <a href="#" class="event" id="all">전체 삭제</a>
      <a href="#" class="event" id="one">선택 삭제</a>
      <a href="#" class="event" id="down">다운로드</a>
    </div>
    <ul class="video-editor__option">
      <li>
        <p class="video-editor__list">
          <span class="video-editor__label">색상</span>
          <label class="fields__custom-radio gray">
            <input type="radio" name="color" value="#999" checked>
            <span>gray</span>
          </label>
          <label class="fields__custom-radio blue">
            <input type="radio" name="color" value="#09F">
            <span>blue</span>
          </label>
          <label class="fields__custom-radio green">
            <input type="radio" name="color" value="#0F9">
            <span>green</span>
          </label>
          <label class="fields__custom-radio yellow">
            <input type="radio" name="color" value="#ED0">
            <span>yellow</span>
          </label>
        </p>
      </li>
      <li>
        <p class="video-editor__list">
          <span class="video-editor__label">선 두께</span>
          <label class="fields__custom-radio">
            <input type="radio" name="weight" value="3" checked>
            <span>3px</span>
          </label>
          <label class="fields__custom-radio">
            <input type="radio" name="weight" value="5">
            <span>5px</span>
          </label>
          <label class="fields__custom-radio">
            <input type="radio" name="weight" value="10">
            <span>10px</span>
          </label>
        </p>
      </li>
      <li>
        <p class="video-editor__list">
          <span class="video-editor__label">글자크기</span>
          <label class="fields__custom-radio">
            <input type="radio" name="size" value="16" checked>
            <span>16px</span>
          </label>
          <label class="fields__custom-radio">
            <input type="radio" name="size" value="18">
            <span>18px</span>
          </label>
          <label class="fields__custom-radio">
            <input type="radio" name="size" value="24">
            <span>24px</span>
          </label>
          <label class="fields__custom-radio">
            <input type="radio" name="size" value="32">
            <span>32px</span>
          </label>
        </p>
      </li>
    </ul>
    <div class="btn__group">
      <a href="#" class="btn btn__main big" id="save">콘테스트 참여하기</a>
    </div>
  </div>
  <ul class="teaser__cover">
    <li><a href="#" data-url="<?php echo MOVIE_URL?>/1.mp4"><img src="<?php echo IMG_URL?>/cover1.jpg" alt="cover1"></a></li>
    <li><a href="#" data-url="<?php echo MOVIE_URL?>/2.mp4"><img src="<?php echo IMG_URL?>/cover2.jpg" alt="cover2"></a></li>
    <li><a href="#" data-url="<?php echo MOVIE_URL?>/3.mp4"><img src="<?php echo IMG_URL?>/cover3.jpg" alt="cover3"></a></li>
    <li><a href="#" data-url="<?php echo MOVIE_URL?>/4.mp4"><img src="<?php echo IMG_URL?>/cover4.jpg" alt="cover4"></a></li>
    <li><a href="#" data-url="<?php echo MOVIE_URL?>/5.mp4"><img src="<?php echo IMG_URL?>/cover5.jpg" alt="cover5"></a></li>
  </ul>
</section>
<script>
  let cover = null
  $('.teaser__cover img').click(e => cover = e.currentTarget.src)
  $('#save').click(e => {
    <?php if ($member) { ?>
    e.preventDefault()
    if (cover === null) {
      alert('동영상을 선택해주세요.')
      return false
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const formData = new FormData()
    data.clips.forEach(({ el, start, end }) => {
      const clone = el.cloneNode(true)
      setAttr(clone, { 'data-start': start, 'data-end': end })
      svg.appendChild(clone)
    })
    setAttr(svg, { width: 800, height: 450 })
    const frm = `
      <form action="" method="post">
        <input type="hidden" name="action" value="edited_insert" />
        <input type="hidden" name="midx" value="<?php echo $member->idx?>" />
        <input type="hidden" name="svg" value='${svg.outerHTML}' />
        <input type="hidden" name="video" value="${data.video.src}" />
        <input type="hidden" name="cover" value="${cover}" />
      </form>
    `
    $(frm).appendTo('body').submit()
    <?php } else { ?>
    alert('로그인 후 사용가능합니다.')
    <?php } ?>
  })
</script>