<?php
  $dataDir = _ROOT_.'/public/data';
  $historyDir = "{$dataDir}/history";
  $jsonDir = "{$historyDir}/data.json";
  @unlink($dataDir.'/history/data.json');
  @rmdir($historyDir);
  $zip = new ZipArchive();
  $zip->open($dataDir.'/history.zip');
  mkdir($historyDir);
  $zip->extractTo($historyDir);
  $zip->close();
  $json_text = file_get_contents($jsonDir);
  $json_text = preg_replace('/(\/\*)(\r|\n|\r\n)(.+)(\r|\n|\r\n)(\*\/)/', "", $json_text); // 주석 제거
  $json = json_decode($json_text);
?>
<main class="site-content sub-content history container">
  <h1 class="content__title">모터쇼 연혁</h1>
  <ul class="history__content">
    <?php foreach ($json as $year=>$list): ?>
    <li>
      <dl>
        <dt><?php echo $year?></dt>
        <dd>
          <div class="history__content-image"><img src="<?php echo $list[0]?>" src="<?php echo $year?>"></div>
          <div class="history__content-info">
            <?php foreach ($list as $k => $v): if($k === 0) continue; ?>
            <p><?php echo $v?></p>
            <?php endforeach ?>
          </div>
        </dd>
      </dl>
    </li>
    <?php endforeach ?>
  </ul>
</main>