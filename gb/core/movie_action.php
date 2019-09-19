<?php
$sql = $msg = $url = "";
$execArr = [];
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
      category = '{$category}'
    ";
    $msg = "출품신청이 완료되었습니다.";
    $url = HOME_URL."/movie/add";
  break;
  case 'edited_insert' :
    $sql = "INSERT INTO edited SET midx = ?, svg = ?, video = ?, cover = ?;";
    $execArr = [$midx, $svg, $video, $cover];
    $msg = "콘테스트 참가가 완료되었습니다.";
    $url = HOME_URL."/movie/edit";
  break;
  case 'assessment_insert' :
    $sql = "INSERT INTO assessment SET `eidx` = {$idx}, `midx` = {$midx}, `point` = {$point}";
    $msg = "평가를 완료화였습니다.";
    $url = HOME_URL."/movie/view/{$idx}";
  break;
}

query($sql, $execArr);
alert($msg);
move($url);