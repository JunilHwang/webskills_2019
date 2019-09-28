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

const headerRender = ({logo, menu} = {}) => `
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
      <div id="site-logo">
        <a href="#">
          ${logo !== undefined
            ? `<img src="${logo}" alt="logo" title="logo">`
            : `<img src="../image/logo/logo.png" alt="logo" title="logo">부산국제매직페스티벌`
          }
        </a>
      </div>
      <nav id="gnb">
        <ul>
          ${menu
            ? menu.map(({url, title}) => `<li><a href="${url}">${title}</a></li>`).join('')
            : `
            <li><a href="#">MENU1</a></li>
            <li><a href="#">MENU2</a></li>
            <li><a href="#">MENU3</a></li>`}          
        </ul>
      </nav>
    </div>
  </header>
`

const footerRender = () => `
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

const visual1Render = () => `
  <section id="visual1" class="visual">
    <div class="slide"></div>
    <div class="slide"></div>
    <div class="visual-text">
      <h1>부산국제매직페스티벌</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque maxime error fugiat, non, accusantium atque. Dolores velit, reiciendis repellendus odit illo unde. Qui error labore perferendis quos veritatis, voluptatibus itaque.
      Learn more</p>
      <a href="#" class="btn btn__green big">바로가기</a>
    </div>
  </section>
`
const visual2Render = () => `
  <section id="visual2" class="visual">
    <input type="radio" name="slide" id="slide1" checked>
    <input type="radio" name="slide" id="slide2">
    <input type="radio" name="slide" id="slide3">
    <div class="visual-text">
      <h1>부산국제매직페스티벌</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque maxime error fugiat, non, accusantium atque. Dolores velit, reiciendis repellendus odit illo unde. Qui error labore perferendis quos veritatis, voluptatibus itaque.
      Learn more</p>
      <a href="#" class="btn btn__green big">바로가기</a>
    </div>
    <div class="slide-section">
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
    </div>
    <div class="btns">
      <div>
        <div class="slide-btn prev">
          <label class="none">&lt;</label>
          <label for="slide1">&lt;</label>
          <label for="slide2">&lt;</label>
        </div>
        <div class="slide-btn next">
          <label for="slide2">&gt;</label>
          <label for="slide3">&gt;</label>
          <label class="none">&gt;</label>
        </div>
      </div>
    </div>
  </section>
`
const feature1Render = () => `
  <section id="feature1" class="content">
    <h2>Features</h2>
    <div class="wrap">
      <article>
        <img src="../image/icon/1.png" alt="icon1" title="icon1" class="img-body">
        <h3>Lorem ipsum1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
      <article>
        <img src="../image/icon/2.png" alt="icon2" title="icon2" class="img-body">
        <h3>Lorem ipsum2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
      <article>
        <img src="../image/icon/3.png" alt="icon3" title="icon3" class="img-body">
        <h3>Lorem ipsum3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
    </div>
  </section>
`
const feature2Render = () => `
  <section id="feature2" class="content">
    <h2>Features</h2>
    <div class="wrap">
      <article>
        <div class="img">
          <img src="../image/icon/4.png" alt="icon1" title="icon1" class="img-body">
        </div>
        <h3>Lorem ipsum1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
      <article>
        <div class="img">
          <img src="../image/icon/5.png" alt="icon2" title="icon2" class="img-body">
        </div>
        <h3>Lorem ipsum2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
      <article>
        <div class="img">
          <img src="../image/icon/6.png" alt="icon3" title="icon3" class="img-body">
        </div>
        <h3>Lorem ipsum3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
    </div>
  </section>
`
const gallery1Render = () => `
  <section id="gallery1" class="content">
    <h2>Gallery</h2>
    <input type="radio" name="pos" id="pos1" checked>
    <input type="radio" name="pos" id="pos2">
    <input type="radio" name="modal" id="modal1">
    <input type="radio" name="modal" id="modal2">
    <input type="radio" name="modal" id="modal3">
    <input type="radio" name="modal" id="modal4">
    <input type="radio" name="modal" id="modal5">
    <input type="radio" name="modal" id="modal6">
    <input type="radio" name="modal" id="close">
    <div id="modal">
      <div class="wrap">
        <img src="../image/gallery/19.jpg" alt="19.jpg" title="19.jpg">
        <img src="../image/gallery/24.jpg" alt="24.jpg" title="24.jpg">
        <img src="../image/gallery/11.jpg" alt="11.jpg" title="11.jpg">
        <img src="../image/gallery/20.jpg" alt="20.jpg" title="20.jpg">
        <img src="../image/gallery/27.jpg" alt="27.jpg" title="27.jpg">
        <img src="../image/gallery/25.jpg" alt="25.jpg" title="25.jpg">
        <label for="close">X</label>
      </div>
    </div>
    <div class="wrap">
      <div>
        <article>
          <label for="modal1"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum1</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal2"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum2</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal3"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum3</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal4"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum4</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal5"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum5</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal6"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum6</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
    </div>
    <div class="btns">
      <label for="pos1"></label>
      <label for="pos2"></label>
    </div>
  </section>
`
const gallery2Render = () => `
  <section id="gallery2" class="content">
    <h2>Gallery</h2>
    <input type="radio" name="modal" id="modal1">
    <input type="radio" name="modal" id="modal2">
    <input type="radio" name="modal" id="modal3">
    <input type="radio" name="modal" id="modal4">
    <input type="radio" name="modal" id="modal5">
    <input type="radio" name="modal" id="modal6">
    <input type="radio" name="modal" id="modal7">
    <input type="radio" name="modal" id="close">
    <div id="modal">
      <div class="wrap">
        <img src="../image/gallery/19.jpg" alt="19.jpg" title="19.jpg">
        <img src="../image/gallery/24.jpg" alt="24.jpg" title="24.jpg">
        <img src="../image/gallery/11.jpg" alt="11.jpg" title="11.jpg">
        <img src="../image/gallery/20.jpg" alt="20.jpg" title="20.jpg">
        <img src="../image/gallery/27.jpg" alt="27.jpg" title="27.jpg">
        <img src="../image/gallery/25.jpg" alt="25.jpg" title="25.jpg">
        <img src="../image/gallery/26.jpg" alt="26.jpg" title="26.jpg">
        <label for="close">X</label>
      </div>
    </div>
    <div class="wrap">
      <div class="left side">
        <article>
          <label for="modal1"></label>
          <div class="text">
            <h3>Lorem ipsum1</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal2"></label>
          <div class="text">
            <h3>Lorem ipsum2</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
      <div class="middle">
        <article>
          <label for="modal3"></label>
          <div class="text">
            <h3>Lorem ipsum3</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal4"></label>
          <div class="text">
            <h3>Lorem ipsum4</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal5"></label>
          <div class="text">
            <h3>Lorem ipsum5</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
      <div class="right side">
        <article>
          <label for="modal6"></label>
          <div class="text">
            <h3>Lorem ipsum6</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal7"></label>
          <div class="text">
            <h3>Lorem ipsum7</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
`
const contact1Render = () => `
  <section id="contacts1">
    <div class="wrap">
      <form class="contact-form">
        <h2>Contact Us</h2>
        <label for="name"><input type="text" name="name" id="name" placeholder="이름을 입력하세요."></label>
        <label for="email"><input type="email" name="email" id="email" placeholder="이메일을 입력하세요."></label>
        <label for="message">
          <textarea name="message" id="message" placeholder="메시지를 입력하세요."></textarea>
        </label>
        <button type="submit" class="btn">전송</button>
      </form>
      <div class="contact-info">
        <h3>Contact information</h3>
        <div>
          <div class="address">
            <div class="icon"><img src="../image/icon/location.png" alt="location" title="location"></div>
            <p>주소 : 부산시 해운대구 123</p>
          </div>
          <div class="tel">
            <div class="icon"><img src="../image/icon/phone.png" alt="phone" title="phone"></div>
            <p>전화번호 : 123-456-7890</p>
          </div>
          <div class="email">
            <div class="icon"><img src="../image/icon/email.png" alt="email" title="email"></div>
            <p>이메일 : webskills@skills.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`
const contact2Render = () => `
  <section id="contacts2">
    <div class="contact-info">
      <div>
        <article class="address">
          <div class="icon"><img src="../image/icon/location.png" alt="location" title="location"></div>
          <p>주소 : 부산시 해운대구 123</p>
        </article>
        <article class="tel">
          <div class="icon"><img src="../image/icon/phone.png" alt="phone" title="phone"></div>
          <p>전화번호 : 123-456-7890</p>
        </article>
        <article class="email">
          <div class="icon"><img src="../image/icon/email.png" alt="email" title="email"></div>
          <p>이메일 : webskills@skills.com</p>
        </article>
      </div>
    </div>
    <form class="contact-form">
      <h2>Contact Us</h2>
      <label for="name"><input type="text" name="name" id="name" placeholder="이름을 입력하세요."></label>
      <label for="email"><input type="email" name="email" id="email" placeholder="이메일을 입력하세요."></label>
      <label for="message">
        <textarea name="message" id="message" placeholder="메시지를 입력하세요."></textarea>
      </label>
      <button type="submit" class="btn">전송</button>
    </form>
  </section>
`

const app = async model => {
  const pageList = await model.getPage()
  const layerClose = e => {
    if (e.keyCode === 27 && $('.layer').length) $('.layer').remove()
  }
  const pageAdmin = async () => {
    $('body').append(pageAdmin.template().outerHTML)
  }
  pageAdmin.template = () => $(`
    <div class="layer" id="pageAdminTpl">
      <span class="middle"></span><div>
        <a href="#" class="layer__close">X</a>
        <h3 class="layer__title">페이지 관리</h3>
        <div class="table">
          <table>
            <colgroup>
              <col width="10%" />
              <col width="25%" />
              <col width="25%" />
              <col width="20%" />
              <col width="20%" />
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
              <tr data-key="${k}" class="${v.state ? 'preview' : '' }">
                ${v.state ? `
                <td>${v.id}</td>
                <td>${v.title}</td>
                <td>${v.description}</td>
                <td>${v.keyword}</td>
                <td><a href="#" id="pageUpdate" class="btn btn__default">페이지 수정</a></td>
                ` : `
                <td><input type="text" class="fields__input full" size="10" value="${v.id}" autofocus /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.title}" /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.description}" /></td>
                <td><input type="text" class="fields__input full" size="25" value="${v.keyword}" /></td>
                <td><a href="#" id="pagePut" class="btn btn__default">수정 완료</a></td>
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
  pageAdmin.reload = () => {
    $('#pageAdminTpl').html(pageAdmin.template().innerHTML)
    $('[autofocus]').focus()
    model.setPage(pageList)
  }
  pageAdmin.add = () => {
    pageList.forEach(v => v.state = true)
    const page = {
      id: pageList.length + 1,
      title: '페이지 제목',
      description: '페이지 설명',
      keyword: '페이지 키워드',
      state: false,
      template: `${headerRender()}${footerRender()}`
    }
    pageList.push(page)
    pageAdmin.reload()
  }
  pageAdmin.put = e => {
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
    pageAdmin.reload()
  }
  pageAdmin.update = e => {
    const wrap = $(e.currentTarget).closest('[data-key]')
    const key = wrap.data('key')
    pageList.forEach(v => v.state = true)
    pageList[key].state = false
  }
  pageAdmin.preview = e => {
    const key = $(e.currentTarget).closest('[data-key]').data('key')
    $('#preview').html(pageList[key].template)
  }

  const pageBuilder = e => {
    const arr = [
      { title: 'Visual', method: 'visual' },
      { title: 'Features', method: 'feature' },
      { title: 'Gallery&Slider', method: 'gallery' },
      { title: 'Contacts', method: 'contact' },
    ]
    $('body').append(`
      <div class="layer">
        <span class="middle"></span><div style="width:400px">
          <a href="#" class="layer__close">X</a>
          <h3 class="layer__title">페이지 제작</h3>
          <div class="table" id="buildType">
            <table>
              <thead>
                <tr>
                  <th>유형</th>
                </tr>
              </thead>
              <tbody>
                ${arr.map(({title, method}) => `
                  <tr style="text-align:left;">
                    <td>
                      <a href="#" class="btn btn__default big to-main" data-method="${method}1">${title} 01</a>
                      <a href="#" class="btn btn__default big to-main" data-method="${method}2">${title} 02</a>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `)
  }
  pageBuilder.append = e => {
    if ($('#preview').html().length === 0) {
      alert('미리보기를 선택해주세요')
      return false
    }
    const method = e.target.dataset.method + 'Render'
    console.log(method)
    const render = {
      visual1Render, visual2Render,
      feature1Render, feature2Render,
      gallery1Render, gallery2Render,
      contact1Render, contact2Render
    }[method]()
    $('#preview footer').before(render)
  }

  $(document)
    .on('click', 'a[href="#"]', () => false)
    .on('click', '#pageAdmin', pageAdmin)
    .on('click', '.layer__close', () => $('.layer').remove())
    .on('click', '#pageAdd', pageAdmin.add)
    .on('click', '#pagePut', pageAdmin.put)
    .on('click', '#pageUpdate', pageAdmin.update)
    .on('keyup', '#pageAdminTpl input', e => { if (e.keyCode === 13) pageAdmin.put(e) })
    .on('click', '.preview', pageAdmin.preview)
    .on('click', '#pageBuilder', pageBuilder)
    .on('click', '#buildType .btn', pageBuilder.append)

  $(window)
    .on('keydown', layerClose)
}

model.init().then(app)