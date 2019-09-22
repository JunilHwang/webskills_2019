<?php
  $sql = "SELECT * FROM events WHERE end > now()";
  $rows = fetchAll($sql);
  $selectedRow = fetch(
    isset($idx)
    ? "SELECT * FROM events WHERE idx = '{$idx}'"
    : "{$sql} ORDER BY end ASC LIMIT 1"
  );
  $url = HOME_URL."/booth/intro";
?>
<main class="site-content sub-content booth container">
  <h1 class="content__title">참가업체 부스 배치도</h1>
  <form action="" class="fields" method="post">
    <fieldset>
      <legend class="legend">행사일정 선택</legend>
      <select name="eidx" class="fields__input full" onchange="location.href = '<?php echo $url?>/'+this.value" required>
        <?php foreach ($rows as $row) { ?>
        <option value="<?php echo $row->idx?>"<?php echo $selectedRow->idx == $row->idx ? ' selected' : ''?>><?php echo "{$row->start} ~ {$row->end}"?></option>
        <?php }  ?>
      </select>
      <div id="layout"></div>
    </fieldset>
  </form>
  <div class="table">
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
<script>
  const svg = `<?php echo $selectedRow->layout?>`  
  const svgHTML = svg.replace(/foreignobject/g, 'foreignObject').replace(/1px/g, '2px')
  const blob = new Blob([svgHTML], {type: 'image/svg+xml'})
  const src = URL.createObjectURL(blob)
  const img = document.createElement('img')
  img.src = src;
  layout.append(img)
</script>