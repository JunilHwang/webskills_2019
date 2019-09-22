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
          <th>참가업체명</th>
          <th>부스번호</th>
          <th>전시품목</th>
        </tr>
      </thead>
      <tbody>
        <?php
          $rows = fetchAll("SELECT bc.booth, m.name FROM booth_connect bc JOIN member m ON bc.midx = m.idx WHERE bc.eidx = '{$idx}'");
          foreach ($rows as $k=>$row) {
        ?>
        <tr>
          <td><?php echo $k + 1?></td>
          <td><?php echo $row->name?></td>
          <td><?php echo $row->booth?></td>
          <td>-</td>
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