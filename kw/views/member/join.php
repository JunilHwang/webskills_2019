<main class="site-content sub-content join form container">
  <h1 class="content__title">회원가입</h1>
  <form action="" class="fields" method="post">
    <fieldset>
      <legend class="legend">회원가입 폼</legend>
      <input type="hidden" name="action" value="join">
      <ul>
        <li>
          <label>
            <span class="fields__list">아이디</span>
            <input type="text" name="id" class="fields__input full" placeholder="아이디를 입력해주세요" required autofocus>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">비밀번호</span>
            <input type="password" name="pw" class="fields__input full" placeholder="비밀번호를 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">비밀번호 확인</span>
            <input type="password" name="pw_re" class="fields__input full" placeholder="비밀번호 확인을 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">이름</span>
            <input type="text" name="name" class="fields__input full" placeholder="이름을 입력해주세요" required>
          </label>
        </li>
        <li class="fields__buttons">
          <button class="btn btn__main full">가입하기</button>
          <a href="./login" class="btn btn__default full">로그인</a>
        </li>
      </ul>
    </fieldset>
  </form>
</main>