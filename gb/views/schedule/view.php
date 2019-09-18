<?php
  $date = $idx;
  $rows = fetchAll("
    SELECT s.*, mv.*, m.*
    FROM schedule s
    JOIN movie mv ON s.mvidx = mv.idx
    JOIN member m ON m.idx = mv.midx
    WHERE s.date = {$date}
    order by start ASC
  ");
  $downUri = SRC_URL."/down/";
?>
<section class="sub-content container schedule-view">
  <h2 class="content__title">[<?php echo date("Y-m-d", strtotime($date)) ?>] 상영일정 상세조회</h2>
  <!-- 상영시간, 출품자이름/아이디, 영화제목, 러닝타임, 제작년도, 분류에 대한 정확한 정보를 나타낸다. -->
  <?php foreach ($rows as $row): ?>
  <article>
    <header class="schedule-view__range">
      <strong class="range__label">상영시간</strong>
      <p class="range__description">
        <?php echo date("H:i", $row->start) ?> ~
        <?php echo date("H:i", $row->end) ?>
      </p>
    </header>
    <ul class="schedule-view__detail">
      <li>
        <strong class="detail__label">영화제목</strong>
        <p class="detail__description"><?php echo $row->subject?></p>
      </li>
      <li>
        <strong class="detail__label">출품자이름/아이디</strong>
        <p class="detail__description"><?php echo "{$row->name}/{$row->id}"?></p>
      </li>
      <li>
        <strong class="detail__label">러닝타임</strong>
        <p class="detail__description"><?php echo $row->duration?> 분</p>
      </li>
      <li>
        <strong class="detail__label">제작년도</strong>
        <p class="detail__description"><?php echo $row->date?></p>
      </li>
      <li>
        <strong class="detail__label">분류</strong>
        <p class="detail__description"><?php echo $row->category?></p>
      </li>
    </ul>
  </article>
  <?php endforeach ?>
  <?php if (count($rows) === 0): ?>
  <p>해당 날짜에는 상영예정인 영화가 없습니다.</p>
  <?php endif ?>
  <div class="btn__group right">
    <a href="<?php echo HOME_URL?>/schedule/calendar" class="btn btn__default big">목록으로</a>
  </div>
</section>