<section class="sub-content container login">
  <h2 class="content__title">로그인</h2>
  <form action="" class="fields" method="post">
    <fieldset>
      <legend class="legend">로그인 폼</legend>
      <input type="hidden" name="action" value="login">
      <ul>
        <li>
          <label>
            <span class="fields__list">아이디</span>
            <input type="text" name="id" class="fields__input full" placeholder="아이디를 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">비밀번호</span>
            <input type="password" name="pw" class="fields__input full" placeholder="비밀번호를 입력해주세요" required>
          </label>
        </li>
        <li class="fields__buttons">
          <button type="submit" class="btn btn__main full">로그인</button>
          <a href="./join" class="btn btn__default full">회원가입</a>
        </li>
      </ul>
    </fieldset>
  </form>
</section>