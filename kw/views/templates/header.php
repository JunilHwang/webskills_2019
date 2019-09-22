<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>부산 국제 모터쇼</title>
  <link rel="stylesheet" type="text/css" href="<?php echo SRC_URL?>/fontawesome-free-5.1.0-web/css/all.css">
  <link rel="stylesheet" type="text/css" href="<?php echo CSS_URL?>/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container">
      <h3 class="logo"><a href="<?php echo HOME_URL?>">부산국제모터쇼</a></h3>
      <nav class="gnb">
        <ul>
          <li>
            <a href="<?php echo HOME_URL?>/intro/summary">부산국제모터쇼</a>
            <ul>
              <li><a href="<?php echo HOME_URL?>/intro/summary">행사소개</a></li>
              <li><a href="<?php echo HOME_URL?>/intro/history">모터쇼 연혁</a></li>
            </ul>
          </li>
          <?php if ($member): ?>
          <li>
            <a href="<?php echo HOME_URL?>/member/logout">로그아웃</a>
          </li>
          <?php else: ?>
          <li><a href="<?php echo HOME_URL?>/member/login">로그인</a></li>
          <li><a href="<?php echo HOME_URL?>/member/join">회원가입</a></li>
          <?php endif ?>
          <li><a href="<?php echo HOME_URL?>/booth/reserve">예매하기</a></li>
          <li>
            <a href="<?php echo HOME_URL ?>/booth/intro">관람안내</a>
            <ul>
              <li><a href="<?php echo HOME_URL ?>/booth/intro">참가업체부스배치도</a></li>
            </ul>
          </li>
          <li>
            <a href="<?php echo HOME_URL?>/booth/admin">관리자</a>
            <ul>
              <li><a href="<?php echo HOME_URL?>/booth/admin">사이트관리자</a></li>
              <li><a href="<?php echo HOME_URL?>/booth/company">참가업체 부스신청</a></li>
            </ul>
          </li>
        </ul>
      </nav>
      <ul class="sns">
        <li><a href="#"><img src="<?php echo IMG_URL?>/sns01.png" alt="sns01"></a></li>
        <li><a href="#"><img src="<?php echo IMG_URL?>/sns02.png" alt="sns02"></a></li>
        <li><a href="#"><img src="<?php echo IMG_URL?>/sns03.png" alt="sns03"></a></li>
        <li><a href="#"><img src="<?php echo IMG_URL?>/sns04.png" alt="sns04"></a></li>
      </ul>
    </div>
  </header>
  <div class="site-visual<?php if ($page !== 'main') echo ' class="sub"'?>">
    <ul>
      <li>
        <span class="middle"></span><div class="slogan">
          <strong>혁신을 넘다, 미래를 보다.</strong>
          <p>Beyond Innovation, Into the Future</p>
        </div>
      </li>
      <li>
        <span class="middle"></span><div class="slogan">
          <strong>미래의 물결, 감동의 기술</strong>
          <p>Future wave, Inspiring technology</p>
        </div>
      </li>
      <li>
        <span class="middle"></span><div class="slogan">
          <strong>자동차의 바다, 세계를 품다</strong>
          <p>Ocean of vehicles, leading the world</p>
        </div>
      </li>
      <li>
        <span class="middle"></span><div class="slogan">
          <strong>바다를 품은 녹색자동차의 항해</strong>
          <p>The voyage of the green car across the ocean</p>
        </div>
      </li>
    </ul>
  </div>