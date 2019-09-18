<?php
  $rows = fetchAll("SELECT * FROM movie order by idx ASC");
?>
<!--
  관리자페이지는 상영일정을 등록할 수 있는 폼을 제공한다.
  입력정보에는 상영일정[년/월/일/시/분],
  출품작선택 [출품작제목(러닝타임)]에 대한 정확한 정보를 입력받고
  (출품작선택은 출품신청 목록 중 행사일정에 등록되지 않은 목록만 보여 진다.)
  등록하기 버튼을 클릭하면 정상적으로 데이터베이스에 입력되고 상영일정, 상영작검색 페이지에 적용된다.
  
  관리자페이지에서 상영일정 등록시 다른 상영일정과 년/월/일/시/분 또는 러닝타임이 겹친다면 경고 메시지를 보여주고 등록을 제한한다.
--> 
<section class="sub-content container schedule-add">
  <h2 class="content__title">상영일정등록</h2>
  <form action="" class="fields" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend class="legend">상영일정등록 폼</legend>
      <input type="hidden" name="action" value="insert">
      <ul>
        <li>
          <label>
            <span class="fields__list">상영일정[년/월/일]</span>
            <input type="date" name="date" class="fields__input full" placeholder="상영일정[년/월/일]을 입력해주세요" required>
          </label>
        </li>
        <li>
          <label>
            <span class="fields__list">상영일정[시/분]</span>
            <input type="time" name="start" class="fields__input full" placeholder="상영일정[시/분]을 입력해주세요" required>
          </label>
        </li>
        <li>
          <span class="fields__list">출품작선택</span>
          <?php foreach ($rows as $k=>$row): ?>
          <label class="fields__custom-radio">
            <input type="radio" name="mvidx" value="<?php echo $row->idx?>"<?php echo $k === 0 ? ' checked' : ''?>>
            <span><?php echo "{$row->subject}({$row->duration})"?></span>
          </label>
          <?php endforeach ?>
        </li>
        <li class="fields__buttons">
          <button class="btn btn__main full">작성완료</button>
        </li>
      </ul>
    </fieldset>
  </form>
</section>