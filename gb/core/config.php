<?php
session_start();
$param = isset($_GET['param']) ? explode('/', $_GET['param']) : [];
$page = $param[0] ?? 'main';
$action = $param[1] ?? NULL;
$idx = $param[2] ?? NULL;
$include_file = $action ?? $page;
$member = $_SESSION['member'] ?? null;
$isAdmin = isset($member) && $member->id === 'admin';

$menu = [
  ['title'=>'부산국제영화제', 'url'=>'/intro/summary', 'child'=> [
    ['title'=>'개최안내', 'url'=>'/intro/summary'],
    ['title'=>'행사안내', 'url'=>'/intro/event'],
  ]],
  ['title'=>'출품신청', 'url'=>'/movie/add'],
  ['title'=>'상영일정', 'url'=>'/schedule/calendar'],
  ['title'=>'상영작검색', 'url'=>'/movie/search'],
  ['title'=>'이벤트', 'url'=>'/movie/edit', 'child'=> [
    ['title'=>'영화티저 콘테스트', 'url'=>'/movie/edit'],
    ['title'=>'콘테스트 참여하기', 'url'=>'/movie/assessment'],
  ]],
];
switch ("{$page}_{$include_file}") {
  case 'member_logout' :
    access($member, "회원은 접근할 수 없습니다.");
    session_destroy();
    alert('로그아웃 되었습니다.');
    move(HOME_URL.'/');
  break;
  case 'member_login' :
  case 'member_join' :
    access(!$member, "비회원은 접근할 수 없습니다.");
  break;
}