<?php
switch ($action) {
  case 'join' :
    $idChk = preg_match("/[a-zA-Z0-9]+/", $id);
    $pwChk = strlen($pw) >= 8;
    $nameChk = preg_match("/[ㄱ-힣]+/", $name);
    $nameChk2 = mb_strlen($name, "UTF-8") <= 4;
    access($idChk, "아이디는 영문 혹은 영문숫자 조합으로 입력해주세요");
    access($pwChk, "비밀번호는 8글자 이상으로 입력해주세요.");
    access($nameChk, "이름은 한글로 입력해주세요");
    access($nameChk2, "이름을 4글자 이하로 입력해주세요");
    $cnt = rowCount("SELECT * FROM member WHERE id = '{$id}'");
    access($cnt === 0, "이미 중복된 아이디가 있습니다.");
    query("
      INSERT INTO member SET
      id = '{$id}',
      pw = '{$pw}',
      name = '{$name}'
    ");
    alert('회원가입이 완료되었습니다.');
    move(HOME_URL."/member/login");
  break;
  case 'login' :
    $member = fetch("SELECT idx, id, name FROM member WHERE id = '{$id}' and pw = '{$pw}'");
    access($member, "아이디 또는 비밀번호가 일치하지 않습니다.");
    $_SESSION['member'] = $member;
    alert('로그인 되었습니다.');
    move(HOME_URL.'/');
  break;
}