<?php
  $rows = fetchAll("SELECT * FROM events WHERE end >= now();");
  $thisURL = HOME_URL."/booth/reserve";
  $isSelected = isset($idx) && $idx != '';
?>
<main class="site-content sub-content reserve form container">
  <h1 class="content__title">예매하기</h1>
  <form action="" class="fields" method="post">
    <fieldset>
      <legend class="legend">예매하기 폼</legend>
      <input type="hidden" name="action" value="reserve_insert">
      <ul>
        <li>
          <label>
            <span class="fields__list">행사일정 선택</span>
            <select name="eidx" class="fields__input full" onchange="location.href = '<?php echo $thisURL?>/'+this.value" required>
              <option value="">행사일정을 선택해주세요</option>
              <?php foreach ($rows as $row) { ?>
              <option value="<?php echo $row->idx?>"<?php echo $idx == $row->idx ? ' selected' : ''?>><?php echo "{$row->start} ~ {$row->end}"?></option>
              <?php }  ?>
            </select>
          </label>
        </li>
        <li>
          <span class="fields__list">예매율 정보</span>
          <?php
            if ($isSelected) {          
              $max = fetch("SELECT maximum FROM events WHERE idx = '{$idx}'")->maximum;
              $cnt = rowCount("SELECT * FROM event_reserve WHERE eidx = '{$idx}'");
              $rate = ($cnt/$max);
          ?>
          <!-- config.php에 구현해놨음. -->
          <div class="rate-wrap">
            <img src="<?php echo HOME_URL?>/booth/rate/<?php echo str_replace('.', '_', $rate)?>" alt="예매율" />
            <div>
              <input type="hidden" name="rate" value="<?php echo $rate?>">
              <p><strong>참관가능인원</strong> <?php echo $max - $cnt?> 명</p>
              <p><strong>예매인원</strong> <?php echo $cnt?> 명</p>
              <p><strong>예매율</strong> <?php echo round($rate * 100, 2)?> %</p>
            </div>
          </div>
          <?php } else { ?>
          <input type="text" class="fields__input full" value="행사일정을 선택해주세요" disabled>
          <?php } ?>
        </li>
        <li class="fields__buttons">
          <button type="submit" class="btn btn__main full">예매하기</button>
        </li>
      </ul>
    </fieldset>
  </form>
  <div class="table">
    <form name="deleteFrm" action="" method="post">
      <input type="hidden" name="action" value="reserve_delete">
      <input type="hidden" name="idx" value="">
    </form>
    <table>
      <colgroup>
        <col width="10%" />
        <col width="30%" />
        <col width="30%" />
        <col width="30%" />
      </colgroup>
      <thead>
        <tr>
          <th>번호</th>
          <th>행사일정</th>
          <th>예매일</th>
          <th>예매취소</th>
        </tr>
      </thead>
      <tbody>
        <?php
          $rows = fetchAll("
            SELECT er.*, e.start, e.end
            FROM event_reserve er JOIN events e ON er.eidx = e.idx
            order by e.start ASC
          ");
          foreach ($rows as $k=>$row) {
        ?>
        <tr>
          <td><?php echo $k + 1?></td>
          <td><?php echo "{$row->start} ~ {$row->end}"?></td>
          <td><?php echo $row->reg_date?></td>
          <td>
            <?php
              if ( strtotime(date("Y-m-d")) < strtotime($row->end) ) {
            ?>
            <a href="#" class="btn btn__main" onclick="deleteFrm.idx.value = '<?php echo $row->idx?>'; deleteFrm.submit();">예매취소</a>
            <?php } else { ?>
            -
            <?php } ?>
          </td>
        </tr>
        <?php
          }
        ?>
      </tbody>
    </table>
  </div>
</main>