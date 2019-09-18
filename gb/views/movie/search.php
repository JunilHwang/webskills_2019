<?php
  $category = $_GET['category'] ?? null;
  $search_key = $_GET['search_key'] ?? null;
  $add_sql = '';
  if (isset($search_key)) {
    $add_sql .= "
      and (
        mv.category like '%{$category}%'
        and (
          mv.subject like '%{$search_key}%' or
          m.name like '%{$search_key}%' or
          m.id like '%{$search_key}%'
        )
      )
    ";
  }
  $sql = "
    SELECT mv.*, m.name, m.id
    FROM movie mv JOIN member m ON mv.midx = m.idx
    WHERE exists(SELECT * FROM schedule WHERE mvidx = mv.idx)
  ";
  $total = rowCount($sql);
  $rows = fetchAll($sql.$add_sql);
  $downUri = SRC_URL."/down/";
  $categories = ['극영화','다큐멘터리','애니메이션','기타'];
  $isAll = isset($category) && strlen($category) > 0;
?>
<section class="sub-content container movies">
  <h2 class="content__title">상영작 검색</h2>
  <form action="" method="get" class="movies__search-frm fields">
    <fieldset>
      <legend class="legend">검색</legend>
      <ul>
        <li>
          <span class="movies__search-frm__label">분류</span>
          <label class="fields__custom-radio">
            <input type="radio" name="category" value="" <?php echo !$isAll ? ' checked' : '' ?>>
            <span>전체</span>
          </label>
          <?php foreach ($categories as $v): ?>
          <label class="fields__custom-radio">
            <input type="radio" name="category" value="<?php echo $v?>" <?php echo $category == $v ? ' checked' : ''?>>
            <span><?php echo $v?></span>
          </label>
          <?php endforeach ?>
        </li>
        <li>
          <label>
            <span class="movies__search-frm__label">검색어</span>
            <input type="text" name="search_key" class="fields__input" size="40" placeholder="검색어를 입력해주세요" value="<?php echo $search_key?>">
          </label>
          <button type="submit" class="btn btn__main">검색</button>
        </li>
      </ul>
      <div class="movies__count">
        <span><strong class="total">전체</strong> <?php echo $total?>개</span>
        <span><strong>검색 결과</strong>  <?php echo count($rows)?>개</span>
      </div>
    </fieldset>
  </form>
  <?php foreach ($rows as $row): ?>
  <article>
    <header class="movies__range">
      <strong class="range__label">영화제목</strong>
      <p class="range__description"><?php echo $row->subject?></p>
    </header>
    <ul class="movies__detail">
      <li>
        <strong class="detail__label">분류</strong>
        <p class="detail__description"><?php echo $row->category?></p>
      </li>
      <li>
        <strong class="detail__label">출품자이름/아이디</strong>
        <p class="detail__description"><?php echo "{$row->name}/{$row->id}"?></p>
      </li>
      <li>
        <strong class="detail__label">러닝타임</strong>
        <p class="detail__description"><?php echo $row->duration?> 분</p>
      </li>
      <li>
        <strong class="detail__label">제작년도</strong>
        <p class="detail__description"><?php echo $row->date?></p>
      </li>
    </ul>
  </article>
  <?php endforeach ?>
  <?php if (count($rows) === 0): ?>
  <p class="movies__none">검색 결과가 존재하지 않습니다.</p>
  <?php endif ?>
  <div class="btn__group right">
    <a href="<?php echo HOME_URL?>/schedule/calendar" class="btn btn__default big">목록으로</a>
  </div>
</section>