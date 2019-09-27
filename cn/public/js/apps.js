const model = new class {
  init () {
    const res = indexedDB.open('20190927')
    res.onupgradeneeded = e => {
      const idb = e.target.result
      idb.createObjectStore('pages', {keyPath: 'idx', autoIncrement: true})
      this.idb = idb
    }
    return new Promise(resolve => {
      res.onsuccess = e => {
        this.idb = e.target.result
        resolve(this)
      }
    })
  }
  getTable (table) {
    return this.idb.transaction([table], 'readwrite').objectStore(table)
  }
  query (type, {table, column, idx}) {
    const tbl = this.getTable(table)
    const insert = () => tbl.add(column)
    const update = () => tbl.put(column)
    const del = () => tbl.delete(idx)
    const fetch = () => tbl.get(idx)
    const fetchAll = () => tbl.getAll();
    const res = {insert, update, delete: del, fetch, fetchAll}[type]()
    return new Promise(resolve => { res.onsuccess = e => {
      resolve(e.target.result)
    } })
  }
  async getPage () {
    let pages = await model.query('fetch', {table: 'pages', idx: 1})
    if (pages === undefined) {
      await model.query('insert', {table: 'pages', column: { json: '[]' }})
      pages = {json: '[]'}
    }
    return JSON.parse(pages.json)
  }
  setPage (pages) {
    model.query('update', {table: 'pages', column: {idx: 1, json: JSON.stringify(pages)}})
  }
}

const headerTpl = `
  <header>
    <div class="contact">
      <div class="info">
        <div>
          <img src="../image/icon/location.png" alt="location" title="location"><span>부산시 해운대구 123</span>
        </div>
        <div>
          <img src="../image/icon/phone.png" alt="phone" title="phone"><span>123-456-7890</span>
        </div>
        <div>
          <img src="../image/icon/email.png" alt="email" title="email"><span>webskills@skills.com</span>
        </div>
      </div>

      <div class="social">
        <a href="#"><img src="../image/icon/social1.png" alt="social1" title="social1"></a>
        <a href="#"><img src="../image/icon/social2.png" alt="social2" title="social2"></a>
        <a href="#"><img src="../image/icon/social3.png" alt="social3" title="social3"></a>
        <a href="#"><img src="../image/icon/social4.png" alt="social4" title="social4"></a>
      </div>
    </div>
    <div class="navi">
      <div id="site-logo"><a href="#"><img src="../image/logo/logo.png" alt="logo" title="logo">부산국제매직페스티벌</a></div>
      <nav id="gnb">
        <ul>
          <li><a href="#">MENU1</a></li>
          <li><a href="#">MENU2</a></li>
          <li><a href="#">MENU3</a></li>
        </ul>
      </nav>
    </div>
  </header>
`
const footerTpl = `
  <footer>
    <div id="admin-info">부산국제매직페스티벌 | Busan International Magic Festival<br>부산시 해운대구 123<br>TEL : 123-456-7890 | FAX : 098-765-4321 | E-mail : webskills@skills.com</div>
    <ul id="social">
      <li><a href="#"><img src="../image/icon/social1.png" alt="social1" title="social1"></a></li>
      <li><a href="#"><img src="../image/icon/social2.png" alt="social2" title="social2"></a></li>
      <li><a href="#"><img src="../image/icon/social3.png" alt="social3" title="social3"></a></li>
    </ul>
    <div id="copyright">Copyrightⓒ 2019, webskills all right reserved</div>
  </footer>
`
const previewTpl = `
  ${headerTpl}
  ${footerTpl}
`

const app = async model => {
  const pageList = await model.getPage()
  const layerClose = e => {
    if (e.keyCode === 27 && $('.layer').length) $('.layer').remove()
  }
  const template = () => $(`
    <div class="layer" id="pageAdminTpl">
      <span class="middle"></span><div>
        <a href="#" class="layer__close">X</a>
        <h3 class="layer__title">페이지 관리</h3>
        <div class="table">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="25%" />
              <col width="25%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>Title</th>
                <th>Description</th>
                <th>Keyword</th>
                <th>페이지 수정</th>
              </tr>
            </thead>
            <tbody>
              ${pageList.map((v, k) => `
              <tr data-key="${k}" class="preview">
                ${v.state ? `
                <td>${v.id}</td>
                <td>${v.title}</td>
                <td>${v.description}</td>
                <td>${v.keyword}</td>
                <td>
                  <a href="#" id="pageUpdate" class="btn btn__default">페이지 수정</a>
                </td>
                ` : `
                <td><input type="text" class="fields__input full" size="10" value="${v.id}" autofocus /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.title}" /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.description}" /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.keyword}" /></td>
                <td>
                  <a href="#" id="pagePut" class="btn btn__default">수정 완료</a>
                </td>
                `}
              </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="btn__group right">
            <a href="#" id="pageAdd" class="btn big btn__main">페이지 추가</a>
          </div>
        </div>
      </div>
    </div>
  `)[0]
  const pageAdd = () => {
    pageList.forEach(v => v.state = true)
    const page = { id: pageList.length + 1, title: '페이지 제목', description: '페이지 설명', keyword: '페이지 키워드', state: false, template: previewTpl }
    pageList.push(page)
    reload()
    model.setPage(pageList)
  }
  const pagePut = e => {
    const wrap = $(e.currentTarget).closest('[data-key]')
    const key = wrap.data('key')
    const values = wrap.find('[type="text"]')
    const [id, title, description, keyword, state] = [...Array.from(values).map(v => v.value), true]
    if (/[a-zA-Z0-9]/.test(id) === false) {
      alert('고유코드는 영문 및 숫자만 입력가능합니다.')
      values[0].focus()
      return false
    }
    pageList[key] = { id, title, description, keyword, state, template: pageList[key].template }
    reload()
    model.setPage(pageList)
  }
  const pageUpdate = e => {
    const wrap = $(e.currentTarget).closest('[data-key]')
    const key = wrap.data('key')
    pageList.forEach(v => v.state = true)
    pageList[key].state = false
    reload()
    model.setPage(pageList)
  }
  const reload = () => {
    pageAdminTpl.innerHTML = template().innerHTML
    $('[autofocus]').focus()
  }
  const pageAdmin = async () => {
    $('body').append(template().outerHTML)
  }

  const pagePreview = e => {
    const key = $(e.currentTarget).closest('[data-key]').data('key')
    $('#preview').html(pageList[key].template)
  }

  $(document)
    .on('click', 'a[href="#"]', () => false)
    .on('click', '#pageAdmin', pageAdmin)
    .on('click', '.layer__close', () => $('.layer').remove())
    .on('click', '#pageAdd', pageAdd)
    .on('click', '#pagePut', pagePut)
    .on('click', '#pageUpdate', pageUpdate)
    .on('keyup', '#pageAdminTpl input', e => { if (e.keyCode === 13) pagePut(e) })
    .on('click', '.preview', pagePreview)

  $(window)
    .on('keydown', layerClose)
}

model.init().then(app)