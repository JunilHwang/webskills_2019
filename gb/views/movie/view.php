<?php
  $row = fetch("
    SELECT e.*, m.name, m.id, (
      SELECT sum(a.point)/count(*) FROM assessment a where a.eidx = e.idx
    ) as avg_point
    FROM edited e JOIN member m ON e.midx = m.idx
    WHERE e.idx = '{$idx}'
  ");

  $avg_point = $row->avg_point;
  if ($avg_point === NULL) $avg_point = 0;
?>
<section class="sub-content container teaser__view">
  <h2 class="content__title">영화티저 콘테스트</h2>
  <div class="teaser__video">
    <video src="<?php echo $row->video?>" width="800" height="450"></video>
    <?php echo $row->svg?>
    <a href="#" class="teaser__player" id="player"><i class="far fa-play-circle"></i></a>
  </div>
  <ul>
    <li>
      <strong class="teaser__label">이름</strong>
      <p class="teaser__description"><?php echo $row->name?></p>
    </li>
    <li>
      <strong class="teaser__label">점수</strong>
      <p class="teaser__description"><?php echo $avg_point?></p>
    </li>
  </ul>
  <form action="" class="fields assessment" method="post">
    <fieldset>
      <legend class="legend">평가점수 입력</legend>
      <input type="hidden" name="action" value="assessment_insert">
      <input type="hidden" name="midx" value="<?php echo $member->idx?>">
      <ul>
        <li>
          <span class="fields__list">점수</span>
          <div>
            <?php for ($i = 1; $i<= 10; $i++) { ?>
            <label class="fields__custom-radio">
              <input type="radio" name="point" value="<?php echo $i?>"<?php if ($i===1) echo " checked";?>>
              <span><?php echo $i?> 점</span>
            </label>
            <?php } ?>
          </div>
        </li>
        <li class="fields__buttons">
          <button type="submit" class="btn btn__main">입력완료</button>
          <a href="<?php echo HOME_URL."/movie/teaser"?>" class="btn btn__default">목록으로</a>
        </li>
      </ul>
    </fieldset>
  </form>\
</section>
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