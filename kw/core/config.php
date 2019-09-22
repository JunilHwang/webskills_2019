<?php
session_start();
$param = isset($_GET['param']) ? explode('/', $_GET['param']) : [];
$page = $param[0] ?? 'main';
$action = $param[1] ?? NULL;
$idx = $param[2] ?? NULL;
$include_file = $action ?? $page;
$member = $_SESSION['member'] ?? null;
$isAdmin = isset($member) && $member->id === 'admin';
$isCompany = isset($member) && $member->type === 'company';

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