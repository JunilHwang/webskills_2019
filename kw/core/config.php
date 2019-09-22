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
  case 'member_login' :
  case 'member_join' :
    access(!$member, "회원은 접근할 수 없습니다.");
  break;
  case 'booth_reserve' :
    access($member, "비회원은 접근할 수 없습니다.");
  break;
  break;
  case 'booth_admin' :
    access($isAdmin, "관리자만 접근할 수 있습니다.");
  break;
  case 'member_logout' :
    access($member, "비회원은 접근할 수 없습니다.");
    session_destroy();
    alert('로그아웃 되었습니다.');
    move(HOME_URL.'/');
  break;
  case 'booth_rate' :
    $rate = str_replace('_', '.', $idx);
    $img = imagecreatetruecolor(200, 200);
    imagecolortransparent($img, 0);
    $bg = imagecolorallocate($img, 0xdd, 0xdd, 0xdd);
    $fill = imagecolorallocate($img, 0xd3, 0x05, 0x13);
    imagefilledarc($img, 100, 100, 200, 200, 0, 360, $bg, IMG_ARC_PIE);
    if ($rate > 0) imagefilledarc($img, 100, 100, 200, 200, -90, (360 * $rate) - 90, $fill, IMG_ARC_PIE);
    header("Content-type: image/png");
    imagepng($img);
    imagedestroy($img);
    exit;
  break;
}