<?php
$sql = $msg = $url = "";
switch ($action) {
  case 'insert' :
    $movie = fetch("SELECT * FROM movie WHERE idx = '{$mvidx}'");
    $date = date("Ymd", strtotime($date));
    $start = strtotime("{$date} {$start}:00");
    $end = $start + $movie->duration * 60;
    $search = fetch("
      SELECT * FROM schedule WHERE `date` = '{$date}'
      and (start <= {$end} and end >= {$start})
    ");
    access(!$search, "상영시간이 겹치는 영화가 있습니다.");
    $sql = "
      INSERT INTO schedule SET
      `mvidx` = '{$mvidx}',
      `date` = '{$date}',
      `start` = '{$start}',
      `end` = '{$end}';
    ";
    $msg = "상영 영화가 등록되었습니다.";
    $url = HOME_URL.'/schedule/calendar';
  break;
}

query($sql);
alert($msg);
move($url);