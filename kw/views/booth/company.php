<?php
  $sql = "SELECT * FROM events WHERE end > now()";
  $rows = fetchAll($sql);
  $selectedRow = fetch(
    isset($idx)
    ? "SELECT * FROM events WHERE idx = '{$idx}'"
    : "{$sql} ORDER BY end ASC LIMIT 1"
  );
  $connected = json_encode(fetchAll("SELECT booth FROM booth_connect WHERE eidx = '{$selectedRow->idx}'"));
  $url = HOME_URL."/booth/company";
?>
<main class="site-content sub-content booth container">
  <h1 class="content__title">참가업체 부스신청</h1>
  <form action="" name="frm" class="fields" method="post">
    <fieldset>
      <legend class="legend">참가업체 부스신청</legend>
      <input type="hidden" name="action" value="connect_insert" />
      <ul>
        <li>
          <label>
            <span class="fields__list">행사일정 선택</span>
            <select name="eidx" class="fields__input full" onchange="location.href = '<?php echo $url?>/'+this.value" required>
              <?php foreach ($rows as $row) { ?>
              <option value="<?php echo $row->idx?>"<?php echo $selectedRow->idx == $row->idx ? ' selected' : ''?>><?php echo "{$row->start} ~ {$row->end}"?></option>
              <?php }  ?>
            </select>
          </label>
          <div id="layout"></div>
        </li>
        <li>
          <label>
            <span class="fields__list">부스 선택</span>
            <select name="booth" class="fields__input full" required>
            </select>
          </label>
        </li>
        <li class="fields__buttons">
          <button type="submit" class="btn btn__main big">등록하기</button>
        </li>
      </ul>
    </fieldset>
  </form>
  <div class="table">
    <table>
      <colgroup>
        <col width="10%" />
        <col width="30%" />
        <col width="30%" />
        <col width="15%" />
        <col width="15%" />
      </colgroup>
      <thead>
        <tr>
          <th>번호</th>
          <th>행사일정</th>
          <th>부스신청일</th>
          <th>부스번호</th>
          <th>부스크기 ㎡</th>
        </tr>
      </thead>
      <tbody>
        <?php
          $rows = fetchAll("SELECT bc.*, e.start, e.end FROM booth_connect bc JOIN events e ON bc.eidx = e.idx WHERE bc.midx = '{$member->idx}' ORDER BY bc.reg_date DESC");
          foreach ($rows as $k=>$row) {
        ?>
        <tr>
          <td><?php echo $k + 1?></td>
          <td><?php echo "{$row->start} ~ {$row->end}"?></td>
          <td><?php echo $row->reg_date?></td>
          <td><?php echo $row->booth?></td>
          <td><?php echo $row->area?></td>
        </tr>
        <?php
          }
        ?>
      </tbody>
    </table>
  </div>
</main>
<script>
  const div = document.createElement('div')
  const svg = `<?php echo $selectedRow->layout?>`
  const svgHTML = svg.replace(/foreignobject/g, 'foreignObject').replace(/1px/g, '2px')
  const blob = new Blob([svgHTML], {type: 'image/svg+xml'})
  const src = URL.createObjectURL(blob)
  const img = document.createElement('img')
  img.src = src;
  layout.append(img)

  div.innerHTML = svg
  const boothList = [...div.querySelectorAll('.draw div')].map(v => ({...v.dataset, name: v.innerHTML}))
  const connected = JSON.parse(`<?php echo $connected?>`).map(v => v.booth)
  boothList.sort((a, b) => a.booth - b.booth)
  frm.booth.innerHTML = `
    <option value="">부스를 선택해주세요</option>
    ${boothList.map(({area, name}) => `
      <option value="${name},${area}"${connected.indexOf(name) !== -1 ? ' disabled' : ''}>${name} (${area} ㎡)</option>
    `)}
  `
</script>