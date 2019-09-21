// variables
const cols = [...(new Array(80)).keys()]
const rows = [...(new Array(40)).keys()]
const width = 1200, height = 600, unit = 15
const xmlns = 'http://www.w3.org/1999/xhtml'

// util functions
const create = ele => document.createElement(ele)
const createNS = ele => document.createElementNS(xmlns, ele)
const setAttr = (target, attr) => {
  for (const key in attr) { target.setAttribute(key, attr[key]) }
  return target
}
const getStyle = (target, ...attr) => attr.map(k => parseInt(target.style[k]))
const convert = n => ~~(n/unit)*unit
const svgToImg = svgText => {
  const svgHTML = svgText.replace(/foreignobject/gi, 'foreignObject').replace('class="dot"', 'class="dot img"')
  const blob = new Blob([svgHTML], {type: 'image/svg+xml'})
  const src = URL.createObjectURL(blob)
  return setAttr(create('img'), { src, width: 295 })
}

// app functions
const initRoad = (type = []) => {
  const rectAttr = {xmlns, class: 'default'}
  const dotAttr = {xmlns, class: 'dot'}
  return `
    ${setAttr(create('div'), dotAttr).outerHTML}
    ${type.map(([x, y]) => setAttr(create('div'), { ...rectAttr, style: `left:${(x-1)*unit}px;top:${(y-1)*unit}px` }).outerHTML).join('')}
  `
}

const app = async () => {
  const [saved, layout, type] = '#saved,#layout,#type'.split(',').map(v => $(v))
  const {road1, road2, road3, color} = await fetch('./data/plan.json').then(res => res.json())
  const boothList = Object.entries(color).map(([name, color]) => ({ name, color, el: null, area: 0 }))
  const filled = boothList.map(() => [])
  const types = [[], road1, road2, road3].map(arr => ({arr, html: initRoad(arr)}))
  const savedList = []
  let typeIdx = 0

  layout.html(`
    <div class="admin__canvas">
      <div id="top1" class="svgCanvasTop"></div>
      <div id="top2" class="svgCanvasTop"></div>
      <svg id="svgCanvas" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <style>
          foreignObject div:not(.dot){position:absolute;}
          .default{background:#000;width:${unit}px;height:${unit}px;}
          .draw{background:#ffb;display:flex;justify-content:center;align-items:center;}
          .draw.drawing{z-index:-1}
          .draw::before{content:attr(data-name);color:#fff;}
          .preview{border:1px solid #666;}
          .dot{height:100%;
            background-image: linear-gradient(#ddd 1px, transparent 1px),
                              linear-gradient(90deg, #ddd 1px, transparent 1px);
            background-size: 100% ${unit}px, ${unit}px 100%;
            border-right:1px solid #ddd;border-bottom:1px solid #ddd;box-sizing:border-box;
          }
          .dot.img{height:100%;
            background-image: linear-gradient(#ddd 2px, transparent 2px),
                              linear-gradient(90deg, #ddd 2px, transparent 2px);
            background-size: 100% ${unit}px, ${unit}px 100%;
            border-right:2px solid #ddd;border-bottom:2px solid #ddd;
          }
        </style>
        <foreignObject id="#foreignObject" x="0" y="0" width="${width}" height="${height}">
          ${types[typeIdx].html}
        </foreignObject>        
      </svg>
      <div class="cols">${cols.map(v => `<span>${v+1}</span>`).join('')}</div>
      <div class="rows">${rows.map(v => `<span>${v+1}</span>`).join('')}</div>
    </div>
    <div>
      <select id="boothList">
        ${boothList.map(({ name }, key) => `<option value="${key}">${name}</option>`)}
      </select>
      <span class="area"><span id="area">0</span> ㎡</span>
      <a href="#" id="saveSite" class="btn btn__main">저장</a>
      <a href="#" id="clearSite" class="btn btn__default">삭제</a>
    </div>
  `)
  const [svgCanvas, top1, top2, area] = '#svgCanvas,#top1,#top2,#area'.split(',').map(v => $(v))
  const clone = svgCanvas.clone()
  type.html(
    types.map(({ html }) => (
      clone.find('foreignObject').html(html), svgToImg(clone[0].outerHTML).outerHTML)
    ).join(' ')
  )

  let rect, temp, attr1, attr2, initX, initY, [drawState, booth] = [0, 0]
  const selectBooth = e => booth = e.currentTarget.value*1
  const selectType  = e => {
    typeIdx = $(e.currentTarget).index()
    svgCanvas.find('foreignObject').html(types[typeIdx].html)
    filled.forEach((v, k) => filled[k] = [])
    area.html(0)
  }
  const drawStart = (x, y) => {
    initX = x, initY = y
    drawState = 1
    top1.addClass('active')
    attr1 = { xmlns, style: `left:${x}px;top:${y}px`, class: 'preview' }
    attr2 = { xmlns, style: `background:#ffa;left:${convert(x)}px;top:${convert(y)}px`, class: 'draw', 'data-booth': booth }
    rect = setAttr(create('div'), attr1)
    temp = setAttr(create('div'), attr2)
    svgCanvas.find('foreignObject').prepend(temp).append(rect)
  }
  const drawing = (x, y) => {
    drawState = 2
    const [w, h] = [x - initX, y - initY]
    const [rectW, rectH] = [Math.abs(w), Math.abs(h)]
    let [rectX, rectY] = getStyle(rect, 'left', 'top')
    let [tempX, tempY] = getStyle(temp, 'left', 'top')
    let tempW = Math.abs(convert(x+unit) - convert(initX)),
        tempH = Math.abs(convert(y+unit) - convert(initY))
    if (w < 0) {
      tempX = convert(rectX = x)
      tempW += unit*2
    }
    if (h < 0) {
      tempY = convert(rectY = y)
      tempH += unit*2
    }
    rect.style.cssText = `width:${rectW}px;height:${rectH}px;left:${rectX}px;top:${rectY}px`
    temp.style.cssText = `width:${tempW}px;height:${tempH}px;left:${tempX}px;top:${tempY}px`
  }
  const drawEnd = () => {
    drawState = 0
    const [x, y, w, h] = getStyle(temp, 'left', 'top', 'width', 'height').map(v => v/unit)
    const bool = Math.min(w, h) > 1 && roadCheck([x, y, w, h]) && boothCheck([x, y, w, h])
    const current = boothList[booth]
    const { name, color } = current
    rect = rect.remove()
    top1.removeClass('active')
    if (!bool) { temp = temp.remove(); return }
    temp.style.background = color
    svgCanvas.find('foreignObject').append(temp)
    current.el = (current.el && current.el.remove(), temp)
    current.area = w * h
    setAttr(current.el, { 'data-area': current.area, 'data-name': name })
    area.html(current.area)
  }
  const draw = e => {
    const {top, left} = $(e.currentTarget).offset()
    let [x, y] = [e.pageX - left, e.pageY - top]
    switch (e.type+drawState) {
      case 'mousedown0' : drawStart(x, y); break
      case 'mousemove1' :
      case 'mousemove2' : drawing(x, y); break
      case 'mouseup2' : drawEnd(); break
      case 'mouseup1' :
        drawState = 0;
        top1.removeClass('active');
      break
    }
  }
  const move = (() => {
    let selected, moveState, beforeX, beforeY, originX, originY, w, h
    return e => {
      const {pageX: x, pageY: y} = e
      switch (e.type) {
        case 'mousedown' :
          if (moveState) return
          e.stopPropagation();
          [beforeX, beforeY, selected, moveState] = [x, y, e.currentTarget, true];
          [originX, originY, w, h] = getStyle(selected, 'left', 'top', 'width', 'height');
          booth = selected.dataset.booth*1
          $('#boothList').val(booth)
          area.html(boothList[booth].area)
          top2.addClass('active')
        break;
        case 'mousemove' :
          if (!moveState) return
          const [moveX, moveY] = [originX + convert(x - beforeX), originY + convert(y - beforeY)]
          const xChk = (w + moveX <= width) && (moveX >= 0),
                yChk = (h + moveY <= height) && (moveY >= 0),
                attr = {}
          if (xChk) selected.style.left = moveX + 'px'
          if (yChk) selected.style.top  = moveY + 'px'
        break;
        case 'mouseleave' :
        case 'mouseup' :
          if (!moveState) return
          const args = getStyle(selected,'left','top','width','height').map(v => v/unit)
          if (!roadCheck(args) || !boothCheck(args)) {
            selected.style.left = originX + 'px'
            selected.style.top = originY + 'px'
          }
          moveState = false
          top2.removeClass('active')
        break;
      }
    }
  })();
  const boothFill = ([x, y, w, h], idx = booth) => {
    const arr = []
    for (let i = 1; i <= w; i++)
      for (let j = 1; j <= h; j++)
        arr.push([x + i, y + j])
    filled[idx] = arr
  }
  const pointCheck = ([x, y, w, h]) => ([roadX, roadY]) => {
    for (let i = 1; i <= w; i++)
      for (let j = 1; j <= h; j++)
        if (`${roadX} ${roadY}` === `${x+i} ${y+j}`)
          return true
    return false
  }
  const roadCheck = arr => {
    const chk = types[typeIdx].arr.findIndex(pointCheck(arr)) === -1
    if (!chk) alert('통행로와 겹칩니다.')
    return chk
  }
  const boothCheck = arr => {
    const chk = filled.filter((v, k) => k !== booth).findIndex((v, k) => v.findIndex(pointCheck(arr)) !== -1) === -1
    chk ? boothFill(arr) : alert('다른 부스와 겹칩니다.')
    return chk
  }
  const saveSite = () => {
    const img = svgToImg(svgCanvas[0].outerHTML)
    savedList.push(svgCanvas.find('foreignObject').html())
    saved.append(`
      <div>
        ${img.outerHTML}
        <a href="#" class="deleteSite"><i class="fas fa-times"></i></a>
      </div>
    `)
    return false
  }
  const selectSaved = e => {
    const idx = $(e.currentTarget).index()
    svgCanvas.find('foreignObject').html(savedList[idx])
    filled.forEach((v, k) => filled[k] = [])
    $('#svgCanvas .draw').each((k, rect) => {
      const {booth, area} = rect.dataset
      boothList[booth].el = rect
      boothList[booth].area = area
      boothFill(getStyle(rect, 'left','top','width','height').map(v => v/unit), booth)
    })
    return false
  }
  const clearSite = () => {
    boothList.forEach(v => {
      if (v.area === 0) return
      v.el = v.el.remove()
      v.area = 0
    })
    return false
  }
  const deleteSite = e => {
    const parent = $(e.currentTarget).parent()
    savedList.splice(parent.index(), 1)
    parent.remove()
    if (savedList.length === 0) saved.html('')
    return false
  }

  $(document)
    .on('change', '#boothList', selectBooth)
    .on('click', '#type img', selectType)
    .on('mousedown', '#svgCanvas', draw)
    .on('mouseup mousemove click', '#top1', draw)
    .on('mousedown', '#svgCanvas .draw', move)
    .on('mouseup mouseleave mousemove', '#top2', move)
    .on('click', '#saveSite', saveSite)
    .on('click', '#saved>div', selectSaved)
    .on('click', '#clearSite', clearSite)
    .on('click', '.deleteSite', deleteSite)
}

app()