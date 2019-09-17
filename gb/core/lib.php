<?php

function alert ($msg) {
  echo "<script>alert('{$msg}')</script>";
}

function move ($url = false) {
  echo "<script>";
    echo $url ? "location.replace('{$url}')" : "history.back()";
  echo "</script>";
  exit;
}

function access ($bool, $msg, $url = false) {
  if (!$bool) {
    alert($msg);
    move($url);
  }
}

function print_pre ($el) {
  echo "<pre>";
  print_r($el);
  echo "</pre>";
}

function println ($el) {
  echo "<p>{$el}</p>";
}

function query ($sql, $arr = null) {
  $db = new PDO("mysql:host=127.0.0.1;dbname=20190917;charset=utf8", "root", "");
  $res = $arr === null ? $db->query($sql) : $db->prepare($sql)->execute($arr);
  if (!$res) {
    println($sql);
    print_pre($db->errorInfo());
    exit;
  }
  return $res;
}

function fetch ($sql) {
  return query($sql)->fetch(PDO::FETCH_OBJ);
}

function fetchAll ($sql) {
  return query($sql)->fetchAll(PDO::FETCH_OBJ);
}

function rowCount ($sql) {
  return query($sql)->rowCount();
}

function getExt ($fileName) {
  return strtolower(preg_replace("/(.*)\.(.*)/", "$2", $fileName));
}

function fileUpload ($file) {
  if (!is_uploaded_file($file['tmp_name'])) return "";
  $path = _ROOT_ . '/public/down';
  if (!file_exists($path)) {
    mkdir($path);
  }
  $fileName = time()."_".rand(0, 99999).".".getExt($file['name']);
  move_uploaded_file($file['tmp_name'], $path.'/'.$fileName);
  return $fileName;
}