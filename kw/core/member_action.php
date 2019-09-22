<?php
switch ($action) {
  case 'join' :
    $idChk = preg_match('/^[a-zA-Z0-9]+@[a-zA-Z0-9._-]+\.[a-zA-Z]$/', $id);
    $pwChk = strlen($pw) >= 4;
    $pwChk2 = $pw === $pw_re;
    access($idChk, "아이디는 이메일 형식으로 입력해주세요");
    access($pwChk, "비밀번호는 4글자 이상으로 입력해주세요.");
    access($pwChk2, "비밀번호와 비밀번호 확인이 다릅니다.");

    $cnt = rowCount("SELECT * FROM member WHERE id = '{$id}'");
    access($cnt === 0, "이미 중복된 아이디가 있습니다.");
    query("
      INSERT INTO member SET
      id = '{$id}',
      pw = '{$pw}',
      name = '{$name}',
      type = '{$type}'
    ");
    alert('회원가입이 완료되었습니다.');
    move(HOME_URL."/member/login");
  break;
  case 'login' :
    $member = fetch("SELECT * FROM member WHERE id = '{$id}' and pw = '{$pw}'");
    access($member, "아이디 또는 비밀번호가 일치하지 않습니다.");
    $_SESSION['member'] = $member;
    alert('로그인 되었습니다.');
    move(HOME_URL.'/');
  break;
}