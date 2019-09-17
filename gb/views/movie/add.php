<section class="sub-content container movie-add">
  <h2 class="content__title">출품신청</h2>
  <form action="" class="fields" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend class="legend">출품신청 폼</legend>
      <input type="hidden" name="action" value="movie_insert">
      <input type="hidden" name="midx" value="<?php echo $member->idx?>">
      <ul>
        <li>
          <label>
            <span class="fields__list">출품자 이름/아이디</span>
            <input type="text" class="fields__input full" value="<?php echo "{$member->name}/{$member->id}"?>" disabled>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">영화 제목</span>
            <input type="text" name="subject" class="fields__input full" placeholder="영화 제목을 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">러닝타임</span>
            <input type="number" name="duration" class="fields__input full" min="0" placeholder="러닝타임을 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">제작년도</span>
            <input type="text" name="date" class="fields__input full" placeholder="제작년도를 입력해주세요" required>
          </label>
        </li>
        <li>
          <span class="fields__list">분류</span>
          <div>
            <label class="fields__custom-radio">
              <input type="radio" name="category" value="극영화" checked>
              <span>극영화</span>
            </label>
            <label class="fields__custom-radio">
              <input type="radio" name="category" value="다큐멘터리">
              <span>다큐멘터리</span>
            </label>
            <label class="fields__custom-radio">
              <input type="radio" name="category" value="애니메이션">
              <span>애니메이션</span>
            </label>
            <label class="fields__custom-radio">
              <input type="radio" name="category" value="기타">
              <span>기타</span>
            </label>
          </div>
        </li>
        <li>
          <label>
            <span class="fields__list">영상 업로드</span>
            <input type="file" name="video" class="fields__input full" accept="video/*" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">커버사진 업로드</span>
            <input type="file" name="cover" class="fields__input full" accept="image/*" required>
          </label>
        </li>
        <li class="fields__buttons">
          <button class="btn btn__main full">작성완료</button>
        </li>
      </ul>
    </fieldset>
  </form>
</section>