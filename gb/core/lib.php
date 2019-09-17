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
    alert($url);
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
  $db = new PDO("mysql:host=127.0.0.1;dbname=20190917;charset=utf8", "root", "xampp");
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