<?php
  $rows = fetchAll("
    SELECT e.*, m.name, m.id, (
      SELECT sum(a.point)/count(*) FROM assessment a where a.eidx = e.idx
    ) as avg_point
    FROM edited e JOIN member m ON e.midx = m.idx
    ORDER BY e.idx DESC
  ");
?>
<section class="sub-content container teaser">
  <h2 class="content__title">영화티저 콘테스트</h2>
  <ul class="teaser__cover">
    <?php foreach ($rows as $row): ?>
    <li onclick="location.href = './view/<?php echo $row->idx?>'">
      <div class="teaser__image"><img src="<?php echo $row->cover?>" alt="<?php echo $row->cover?>"></div>
      <strong class="teaser__name">이름 : <?php echo $row->name?></strong>
      <p class="teaser__point">평가점수 : <?php echo $row->avg_point === null ? 0 : $row->avg_point?></p>
    </li>
    <?php endforeach ?>
  </ul>
</section>