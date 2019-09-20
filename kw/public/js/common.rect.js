// variables
const cols = [...(new Array(80)).keys()]
const rows = [...(new Array(40)).keys()]
const width = 1200, height = 600, unit = 15
const xmlns = 'http://www.w3.org/2000/svg'

// util functions
const create = ele => document.createElement(ele)
const createNS = ele => document.createElementNS(xmlns, ele)
const setAttr = (target, attr) => {
  for (const key in attr) { target.setAttribute(key, attr[key]) }
  return target
}
const getAttr = (target, ...attr) => attr.map(k => target.attributes[k].value*1)
const convert = n => ~~(n/unit)*unit
const svgToImg = svgText => {
  const blob = new Blob([svgText], {type: 'image/svg+xml'})
  const src = URL.createObjectURL(blob)
  return setAttr(create('img'), { src, width: 295 })
}

// app functions
const initSvg = (type = []) => {
  const svg = setAttr(createNS('svg'), { xmlns, width, height })
  const lineAttr = {stroke: '#ddd', 'stroke-width': '1'}
  const rectAttr = {width: unit, height: unit, fill: '#000000'}
  svg.innerHTML = `
    ${[...cols, 80].map(v => setAttr(createNS('line'), { x1: v*unit, y1: 0, x2: v*unit, y2: height, ...lineAttr }).outerHTML).join('')}
    ${[...rows, 40].map(v => setAttr(createNS('line'), { x1: 0, y1: v*unit, x2: width, y2: v*unit, ...lineAttr }).outerHTML).join('')}
    ${type.map(([x, y]) => setAttr(createNS('rect'), { ...rectAttr, x: ((x-1)*unit), y: ((y-1)*unit)}).outerHTML).join('')}
  `
  return svg
}

const app = async () => {
  const [saved, layout, type] = '#saved,#layout,#type'.split(',').map(v => $(v))
  const {road1, road2, road3, color} = await fetch('./data/plan.json').then(res => res.json())
  const boothList = Object.entries(color).map(([name, color]) => ({ name, color, el: null, area: 0 }))
  const filled = boothList.map(() => [])
  const types = [[], road1, road2, road3].map(arr => ({arr, svg: initSvg(arr)}))
  let typeIdx = 1
  type.html(types.map(({ svg }) => svgToImg(svg.outerHTML).outerHTML).join(' '))
  layout.html(`
    <div class="admin__canvas">
      <div id="top1" class="svgCanvasTop"></div>
      <div id="top2" class="svgCanvasTop"></div>
      <svg id="svgCanvas" width="${width}" height="${height}">${types[typeIdx].svg.innerHTML}</svg>
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
  const savedList = []

  let rect, temp, attr1, attr2, initX, initY, [drawState, booth] = [0, 0]
  const selectBooth = e => booth = e.currentTarget.value*1
  const selectType  = e => {
    typeIdx = $(e.currentTarget).index()
    svgCanvas.html(types[typeIdx].svg.innerHTML)
    filled.forEach((v, k) => filled[k] = [])
    area.html(0)
  }
  const drawStart = (x, y) => {
    initX = x, initY = y
    drawState = 1
    top1.addClass('active')
    attr1 = { stroke: '#666', 'stroke-width': 1, fill: 'none', x, y }
    attr2 = { fill: '#ffa', x: convert(x), y: convert(y), class: 'draw', 'data-booth': booth }
    rect = setAttr(createNS('rect'), attr1)
    temp = setAttr(createNS('rect'), attr2)
    svgCanvas.prepend(temp).append(rect)
  }
  const drawing = (x, y) => {
    drawState = 2
    const [w, h] = [x - initX, y - initY]
    const [width, height] = [Math.abs(w), Math.abs(h)]
    let width2 = Math.abs(convert(x+unit) - convert(initX)),
        height2 = Math.abs(convert(y+unit) - convert(initY))
    if (w < 0) {
      attr2.x = convert(attr1.x = x)
      width2 += unit*2
    }
    if (h < 0) {
      attr2.y = convert(attr1.y = y)
      height2 += unit*2
    }
    setAttr(rect, {...attr1, width, height})
    setAttr(temp, {...attr2, width: width2, height: height2})
  }
  const drawEnd = () => {
    drawState = 0
    const [x, y, w, h] = getAttr(temp, 'x', 'y', 'width', 'height').map(v => v/15)
    const bool = Math.min(w, h) > 1 && roadCheck([x, y, w, h]) && boothCheck([x, y, w, h])
    const current = boothList[booth]
    rect = rect.remove()
    top1.removeClass('active')
    if (!bool) { temp = temp.remove(); return }
    // const div = rectToDiv([x, y, w, h, current.color, current.name])
    svgCanvas.append(setAttr(temp, {fill: current.color}))
    current.el = (current.el && current.el.remove(), temp)
    current.area = w * h
    setAttr(current.el, { 'data-area': current.area, 'data-name': current.name })
    area.html(current.area)
  }
  const rectToDiv = ([x, y, w, h, fill, name]) => {
    const div = `<div class="draw" x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"></div>`
    return $(div)[0]
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
          [originX, originY, w, h] = getAttr(selected, 'x', 'y', 'width', 'height');
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
          if (xChk) attr.x = moveX
          if (yChk) attr.y = moveY
          setAttr(selected, attr)
        break;
        case 'mouseleave' :
        case 'mouseup' :
          if (!moveState) return
          const args = getAttr(selected,'x','y','width','height').map(v => v/15)
          if (!roadCheck(args) || !boothCheck(args)) {
            setAttr(selected, {x: originX, y: originY})
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
        if (`${roadX} ${roadY}` === `${x+i} ${y+j}`) {
          return true
        }
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
    const svg = setAttr(svgCanvas[0].cloneNode(true), { xmlns })
    const img = svgToImg(svg.outerHTML)
    savedList.push(svg)
    saved.append(`
      <div>
        ${svgToImg(svg.outerHTML).outerHTML}
        <a href="#" class="deleteSite"><i class="fas fa-times"></i></a>
      </div>
    `)
    return false
  }
  const selectSaved = e => {
    const idx = $(e.currentTarget).index()
    svgCanvas.html(savedList[idx].innerHTML)
    filled.forEach((v, k) => filled[k] = [])
    $('#svgCanvas rect[class="draw"]').each((k, rect) => {
      const {booth, area} = rect.dataset
      boothList[booth].el = rect
      boothList[booth].area = area
      boothFill(getAttr(rect, 'x','y','width','height').map(v => v/15), booth)
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
    .on('mousedown', '#svgCanvas rect[class="draw"]', move)
    .on('mouseup mouseleave mousemove', '#top2', move)
    .on('click', '#saveSite', saveSite)
    .on('click', '#saved>div', selectSaved)
    .on('click', '#clearSite', clearSite)
    .on('click', '.deleteSite', deleteSite)
}

app()