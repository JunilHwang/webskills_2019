<?php
  $y = $_GET['y'] ?? date("Y");
  $m = substr('0'.($_GET['m'] ?? date("m")), -2);
  $uri = HOME_URL.'/schedule/calendar';
  $viewUri = HOME_URL.'/schedule/view/';
  $nextM = $m + 1;
  $prevM = $m - 1;
  $nextY = $prevY = $y;
  if ($nextM > 12) {
    $nextM = 1;
    $nextY += 1;
  }
  if ($prevM < 1) {
    $prevM = 12;
    $prevY -= 1;
  }
  $start = date("w", strtotime("{$y}-{$m}-01"));
  $total = date("t", strtotime("{$y}-{$m}-01"));
  $last  = date("w", strtotime("{$y}-{$m}-{$total}"));
  $line  = ceil(($start + $total)/7);
?>
<section class="sub-content container calendar">
  <h2 class="content__title">상영일정</h2>
  <section>
    <header class="calendar__header">
      <h3>
        <?php echo $y ?>년
        <?php echo $m ?>월
      </h3>
      <ul class="calendar__navigation">
        <li><a href="<?php echo $uri.'?y='.($y-1).'&amp;m='.$m?>" class="btn btn__main">이전년</a></li>
        <li><a href="<?php echo $uri."?y=${prevY}&amp;m={$prevM}"?>" class="btn btn__default">이전달</a></li>
        <li><a href="<?php echo $uri."?y=${nextY}&amp;m={$nextM}"?>" class="btn btn__default">다음달</a></li>
        <li><a href="<?php echo $uri.'?y='.($y+1).'&amp;m='.$m?>" class="btn btn__main">다음년</a></li>
      </ul>
    </header>
    <div class="calendar__body">
      <ul class="calendar__top">
        <li>일</li>
        <li>월</li>
        <li>화</li>
        <li>수</li>
        <li>목</li>
        <li>금</li>
        <li>토</li>
      </ul>
      <?php
        for ($i = 0, $day = 1; $i < $line; $i++) {
          echo '<ul>';
          for ($j = 0; $j < 7; $j++) {
            $startBeforeChk = ($i == 0 && $j < $start);
            $endAfterChk = ($i == $line - 1 && $j > $last);
            if ($startBeforeChk || $endAfterChk) {
              echo '<li class="none"></li>'; continue;
            }
            $fullDate = $y.$m.substr("0{$day}", -2);
            $now = date("Ymd") === $fullDate ? ' class="now"' : '';
            echo "<li{$now} onclick=\"location.href = '{$viewUri}{$fullDate}'\">";
            echo "<div class=\"calendar__date\">";
              echo '<span>'. ($day++) .'</span>';
              echo '<div>';
              $sql = "
                SELECT s.*, mv.subject
                FROM schedule s JOIN movie mv ON s.mvidx = mv.idx
                WHERE s.date = '{$fullDate}' order by start asc
              ";
              $rows = fetchAll($sql);
              foreach ($rows as $row) {
                echo "<p>{$row->subject}</p>";
              } 
              echo '</div>';
            echo '</div>';
            echo '</li>';
          }
          echo '</ul>';
        }
      ?>
    </div>
    <?php if ($isAdmin) { ?>
    <div class="btn__group right">
      <a href="<?php echo HOME_URL?>/schedule/add" class="btn btn__main big">상영일정등록</a>
    </div>
    <?php } ?>
  </section>
</section>