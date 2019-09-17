<?php
  define('_ROOT_', __dir__);
  define('HOME_URL', '/webskills/2019_national/gb');
  define('SRC_URL', HOME_URL.'/public');
  define('CSS_URL', SRC_URL.'/css');
  define('JS_URL', SRC_URL.'/js');
  define('IMG_URL', SRC_URL.'/image');
  define('DOWN_URL', SRC_URL.'/down');

  include_once('./core/lib.php');
  include_once('./core/config.php');
  if (isset($_POST['action'])) {
    include_once("./core/{$page}_action.php");
    exit;
  }
  include_once('./views/templates/header.php');
  include_once("./views/". ($page === 'main' ? 'templates/main' : "{$page}/{$include_file}") .".php");
  include_once('./views/templates/footer.php');