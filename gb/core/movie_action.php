<?php
$sql = $msg = $url = "";
switch ($action) {
  case 'movie_insert' :
    $video = fileUpload($_FILES['video']);
    $cover = fileUpload($_FILES['cover']);
    $sql = "
      INSERT INTO movie SET
      midx = '{$midx}',
      subject = '{$subject}',
      duration = '{$duration}',
      date = '{$date}',
      category = '{$category}',
      video = '{$video}',
      cover = '{$cover}'
    ";
    $msg = "출품신청이 완료되었습니다.";
    $url = HOME_URL."/movie/add";
  break;
  case 'schedule_insert' :
    $movie = fetch("SELECT * FROM movie WHERE idx = '{$mvidx}'");
    $start = strtotime("{$date} {$start}:00");
    $end = $start + $movie->duration;
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
    $url = HOME_URL.'/movie/schedule';
  break;
}

query($sql);
alert($msg);
move($url);