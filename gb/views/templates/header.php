<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, inital-scale=1.0">
  <title>부산국제영화제</title>
  <link rel="stylesheet" type="text/css" href="<?php echo CSS_URL?>/common.css">
  <link rel="stylesheet" type="text/css" href="<?php echo SRC_URL?>/fontawesome-free-5.1.0-web/css/all.css">
  <script src="<?php echo JS_URL?>/jquery-latset.min.js"></script>
  <script src="<?php echo JS_URL?>/jquery-ui.min.js"></script>
  <script src="<?php echo JS_URL?>/common.js"></script>
</head>
<body>
<header class="site-header">
  <div class="container">
    <h3 class="logo"><a href="<?php echo HOME_URL?>/">부산국제영화제</a></h3>
    <nav class="gnb">
      <input type="checkbox" id="menu">
      <ul>
        <?php foreach ($menu as $main): ?>
        <li>
          <a href="<?php echo HOME_URL."{$main['url']}"?>"><?php echo $main['title'] ?></a>
          <?php if (isset($main['child'])): ?>
          <ul>
            <?php foreach ($main['child'] as $sub): ?>
            <li><a href="<?php echo HOME_URL."{$sub['url']}"?>"><?php echo $sub['title']?></a></li>
            <?php endforeach ?>
          </ul>
          <?php endif ?>
        </li>
        <?php endforeach ?>
      </ul>
      <div class="membership">
        <?php if ($member): ?>
        <a href="<?php echo HOME_URL ?>/member/logout" class="btn btn__main">로그아웃</a>
        <?php else: ?>
        <a href="<?php echo HOME_URL?>/member/join" class="btn btn__main">회원가입</a>
        <a href="<?php echo HOME_URL ?>/member/login" class="btn btn__main">로그인</a>  
        <?php endif ?>
      </div>
      <label for="menu" class="gnb__mobile"><i class="fas fa-bars"></i></label> 
    </nav>
  </div>
</header>
<section class="site-visual <?php if ($page !== 'main') echo 'sub' ?>">
  <ul>
    <li>
      <span class="middle"></span><p class="site-visual__slogan">
        <span class="left"><i class="fas fa-quote-left"></i></span>
        뉴 커런츠 출신 감독들의 개막작과 폐막작
        <span class="right"><i class="fas fa-quote-right"></i></span>
      </p>
    </li>
    <li>
      <span class="middle"></span><p class="site-visual__slogan">
        <span class="left"><i class="fas fa-quote-left"></i></span>
        아이콘 부문 신설, 선택과 집중
        <span class="right"><i class="fas fa-quote-right"></i></span>
      </p>
    </li>
    <li>
      <span class="middle"></span><p class="site-visual__slogan">
        <span class="left"><i class="fas fa-quote-left"></i></span>
        아시아 여성감독 3인전
        <span class="right"><i class="fas fa-quote-right"></i></span>
      </p>
    </li>
    <li>
      <span class="middle"></span><p class="site-visual__slogan">
        <span class="left"><i class="fas fa-quote-left"></i></span>
        한국영화 100년사, 위대한 정전 10선
        <span class="right"><i class="fas fa-quote-right"></i></span>
      </p>
    </li>
  </ul>
</section>