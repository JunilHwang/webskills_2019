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
}

query($sql);
alert($msg);
move($url);