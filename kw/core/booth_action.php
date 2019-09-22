<?php
$execArr = [];
$sql = $msg = $url = '';
switch ($action) {
  case 'events_insert' :
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
  case 'reserve_insert' :
    access(isset($rate), "행사일정을 선택해주세요");
    access($rate < 1, "예매가 불가능합니다. 정원이 초과되었습니다.");
    $sql = "INSERT INTO event_reserve SET midx = '{$member->idx}', eidx = '{$idx}'";
    $msg = '예매가 완료되었습니다.';
    $url = HOME_URL.'/booth/reserve';
  break;
}
query($sql, $execArr);
alert($msg);
move($url);