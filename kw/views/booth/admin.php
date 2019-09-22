<main class="site-content sub-content admin container">
  <h1 class="content__title">사이트관리자</h1>
  <section class="saved">
    <h2 class="legend">Save</h2>
    <div id="saved"></div>
  </section>
  <section class="layout">
    <h2 class="legend">Layout</h2>
    <div id="layout"></div>
  </section>
  <section class="type">
    <h2 class="legend">Type</h2>
    <div id="type"></div>
  </section>
  <section class="admin__form">
    <form action="" class="fields" method="post">
      <fieldset>
        <legend class="legend">부스등록정보 입력</legend>
        <input type="hidden" name="action" value="events_insert">
        <input type="hidden" name="layout" value=''>
        <ul>
          <li>
            <label>
              <span class="fields__list">행사일정[행사시작일]</span>
              <input type="date" name="start" class="fields__input full" placeholder="행사시작일을 입력해주세요" value="<?php echo date("Y-m-d")?>" required autofocus>
            </label>
          </li>
          <li>
            <label>
              <span class="fields__list">행사일정[행사종료일]</span>
              <input type="date" name="end" class="fields__input full" placeholder="행사종료일을 입력해주세요" value="<?php echo date('Y-m-d')?>" required>
            </label>
          </li>
          <li>
            <label>
              <span class="fields__list">참관가능인원</span>
              <input type="number" name="maximum" class="fields__input full" placeholder="참관가능인원 입력해주세요" min="1" value="1" required>
            </label>
          </li>
          <li class="fields__buttons">
            <button type="submit" class="btn btn__main big">작성완료</button>
          </li>
        </ul>
      </fieldset>
    </form>
  </section>
</main>
<script>const dataURL = location.origin+'<?php echo DATA_URL?>';</script>
<script type="text/javascript" src="<?php echo JS_URL?>/jquery-latset.min.js"></script>
<script type="text/javascript" src="<?php echo JS_URL?>/common.div.js" defer></script>
<script>
  document.forms[0].onsubmit = e => {
    e.target.layout.value = layout.querySelector('svg').outerHTML
  }
</script>