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

const app = async model => {
  const pageList = await model.getPage()
  const layerClose = e => {
    if (e.keyCode === 27 && $('.layer').length) {
      $('.layer:last-child').remove()
    }
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
      template: `${headerRender()}${footerRender()}`,
      selected: false
    }
    pageList.push(page)
    pageAdmin.reload()
  }
  pageAdmin.put = e => {
    const wrap = $(e.currentTarget).closest('[data-key]')
    const key = wrap.data('key')
    const values = wrap.find('[type="text"]')
    const [id, title, description, keyword] = Array.from(values).map(v => v.value)
    if (/[a-zA-Z0-9]/.test(id) === false) {
      alert('고유코드는 영문 및 숫자만 입력가능합니다.')
      values[0].focus()
      return false
    }
    pageList[key] = { ...pageList[key], id, title, description, keyword, state: true }
    pageAdmin.reload()
  }
  pageAdmin.update = e => {
    const wrap = $(e.currentTarget).closest('[data-key]')
    const key = wrap.data('key')
    pageList.forEach(v => v.state = true)
    pageList[key].state = false
    pageAdmin.reload()
  }
  pageAdmin.preview = e => {
    const key = $(e.currentTarget).closest('[data-key]').data('key')
    const before = pageList.find(v => v.selected === true)
    if (before && before.selected) before.selected = false
    const target = pageList[key]
    target.selected = true
    $('#preview').html(target.template)
    model.setPage(pageList)
  }
  pageAdmin.load = e => {
    const selected = pageList.find(v => v.selected === true)
    if (selected) {
      $('#preview').html(selected.template)
      $('#preview .active').click()
    }
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
  pageBuilder.reset = e => {
    if ($('#preview').html().length === 0) {
      alert('미리보기를 선택해주세요')
      return false
    }
    $('#preview').html(`${headerRender()}${footerRender()}`)
    pageBuilder.save()
  }
  pageBuilder.append = e => {
    if ($('#preview').html().length === 0) {
      alert('미리보기를 선택해주세요')
      return false
    }
    const method = e.target.dataset.method + 'Render'
    const render = {
      visual1Render, visual2Render,
      feature1Render, feature2Render,
      gallery1Render, gallery2Render,
      contact1Render, contact2Render
    }[method]()
    $('#preview footer').before(render)
  }
  pageBuilder.select = e => {
    const before = $('#preview>.active').removeClass('active')
    const after = $(e.currentTarget)
    $('#templateOption').remove()
    if (before === after) return false
    after.addClass('active')
    const option = after.data('option')
    $(`<a id="templateOption" href="#" class="btn btn__green big" data-option="${option}">설정</a>`).appendTo('.builder-top__right')
    pageBuilder.save()
  }
  pageBuilder.optionOpen = e => {
    const selected = $('#preview>.active')
    const key = selected.attr('data-render')
    const filter = selected[0].dataset.filter || null
    const urls = pageList.map(v => v.id)
    selected.removeAttr('data-filter')
    let option = selected[0].dataset.option
    if (typeof option === 'string') option = JSON.parse(option)
    const optionRenderer = {
      headerOptionRender, visualOptionRender,
    }[key.replace(/(1|2)/, '')+'OptionRender']
    const templateRenderer = {
      headerRender, footerRender,
      visual1Render, visual2Render,
      feature1Render, feature2Render,
      gallery1Render, gallery2Render,
      contact1Render, contact2Render
    }[key + 'Render']
    const layer = $(`
      <div class="layer">
        <span class="middle"></span><div>
          <a href="#" class="layer__close">X</a>
          <h3 class="layer__title">옵션 설정</h3>
          ${optionRenderer(option, filter, urls)}
        </div>
      </div>`)
    $('body').append(layer)
    layer.on('change', '#logoUploader', e => {
      const files = e.target.files
      if ($('#logoUploaded')) $('#logoUploaded').remove()
      if (files.length) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = () => {
          $(e.target).after(`<img src="${reader.result}" alt="logo" id="logoUploaded" width="200" />`)
        }
        reader.readAsDataURL(file)
      }
    }).on('submit', 'form', e => {
      e.preventDefault()
      const frm = e.target
      const action = frm.action.value
      switch (action) {
        case 'header' :
          if ([null, 'logo'].indexOf(filter) !== -1) {
            const uploaded = $('#logoUploaded')
            const logo = uploaded.length ? uploaded[0].src : (frm.logo.value || null)
            Object.assign(option, { logo })
          }
          if ([null, 'menu'].indexOf(filter) !== -1) {
            const menu = [];
            frm.menu_title.forEach((v, k) => {
              if (v.value.length > 0) {
                menu.push({
                  title: v.value,
                  url: frm.menu_url[k].value
                })
              }
            })
            if (menu.length < 3) {
              alert('메뉴는 최소 3개 이상 입력해야됩니다.')
              return false
            }
            Object.assign(option, { menu })
          }
        break
        case 'visual' :
          option.title = option.title || {}
          option.description = option.description || {}
          option.btn = option.btn || {}
          if (filter === null) {
            option.title.hide = frm.title_hide.value*1
            option.description.hide = frm.description_hide.value*1
            option.btn.hide = frm.btn_hide.value*1
          }
          if (['title', 'description'].indexOf(filter) !== -1){
            const [text, color, size] = [frm.text.value, frm.color.value, frm.size.value]
            option[filter].style  = color ? `color:${color};` : ''
            option[filter].style += size ? `font-size:${size}px;` : ''
            option[filter] = {...option[filter], text, color, size}
          }
          if (filter === 'btn'){
            const [text, url] = [frm.text.value, frm.url.value]
            option[filter] = {...option[filter], text, url}
          }
        break;
      }
      const temp = $(templateRenderer(option))
      temp.addClass('active')
      selected[0].outerHTML = temp[0].outerHTML
      $('.layer').remove()
      pageBuilder.save()
    })
  }
  pageBuilder.optionOpenFilter = e => {
    const filter = e.currentTarget.dataset.context
    const parent = $(e.currentTarget).closest('[data-render]')
    if (!parent.hasClass('active')) return true
    parent.attr('data-filter', filter)
    $('#templateOption').click()
    return false
  }
  pageBuilder.save = () => {
    pageList.find(v => v.selected).template = $('#preview').html()
    model.setPage(pageList)
  }

  $(pageAdmin.load)
    .on('click', 'a[href="#"]', () => false)
    .on('click', '#pageAdmin', pageAdmin)
    .on('click', '.layer__close', e => $(e.currentTarget).closest('.layer').remove())
    .on('click', '#pageAdd', pageAdmin.add)
    .on('click', '#pagePut', pageAdmin.put)
    .on('click', '#pageUpdate', pageAdmin.update)
    .on('keyup', '#pageAdminTpl input', e => { if (e.keyCode === 13) pageAdmin.put(e) })
    .on('click', '.preview', pageAdmin.preview)
    .on('click', '#pageBuilder', pageBuilder)
    .on('click', '#pageReset', pageBuilder.reset)
    .on('click', '#buildType .btn', pageBuilder.append)
    .on('click', '#preview>*', pageBuilder.select)
    .on('click', '#templateOption', pageBuilder.optionOpen)
    .on('contextmenu', '[data-context]', pageBuilder.optionOpenFilter)

  $(window)
    .on('keydown', layerClose)
}

model.init().then(app)