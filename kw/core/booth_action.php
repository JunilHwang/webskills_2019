<?php
$execArr = [];
$sql = $msg = $url = '';
switch ($action) {
  case 'reserve_insert' :
    $sql = "
      SELECT * FROM events e WHERE idx not in (
        SELECT idx FROM events WHERE idx = e.idx and (`start` > '{$end}' or `end` < '{$start}')
      )
    ";
    access(rowCount($sql) === 0, "해당 날짜에 등록된 행사일정이 있습니다.");
    $sql = "INSERT INTO events SET start = ?, end = ?, maximum = ?, layout = ?";
    $layout = str_replace('class="active"', "", $layout);
    $execArr = [$start, $end, $maximum, $layout];
    $msg = "등록되었습니다.";
    $url = HOME_URL."/booth/admin";
  break;
}
query($sql, $execArr);
alert($msg);
move($url);