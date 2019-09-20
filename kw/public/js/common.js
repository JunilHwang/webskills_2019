// util functions
const create = ele => document.createElement(ele)
const createNS = ele => document.createElementNS('http://www.w3.org/2000/svg', ele)
const setAttr = (target, attr) => {
  for (const key in attr) { target.setAttribute(key, attr[key]) }
  return target
}
const getAttr = (target, ...attr) => attr.map(k => target.attributes[k].value*1)

// variables
const cols = [...(new Array(80)).keys()]
const rows = [...(new Array(40)).keys()]
const width = 1200, height = 600, unit = 15
const boothData = { r: [], b: [] }

// app functions
const initSvg = (type = []) => {
  const svg = setAttr(createNS('svg'), {
    xmlns: 'http://www.w3.org/2000/svg', width, height
  })
  const lineAttr = {stroke: '#ddd', 'stroke-width': '1'}
  const rectAttr = {width: unit, height: unit, fill: '#000000'}
  svg.innerHTML = `
    ${[...cols, 80].map(v => setAttr(createNS('line'), { x1: v*unit, y1: 0, x2: v*unit, y2: height, ...lineAttr }).outerHTML).join('')}
    ${[...rows, 40].map(v => setAttr(createNS('line'), { x1: 0, y1: v*unit, x2: width, y2: v*unit, ...lineAttr }).outerHTML).join('')}
    ${type ? type.map(([x, y]) => setAttr(createNS('rect'), { ...rectAttr, x: ((x-1)*unit), y: ((y-1)*unit)}).outerHTML).join('') : ''}
  `
  return svg
}

const app = async () => {
  const saved = $('#saved'),
        layout = $('#layout'),
        type = $('#type')
  const road0 = initSvg()
  const {road1, road2, road3, color} = await fetch('./data/plan.json').then(res => res.json())
  const boothList = Object.entries(color).map(([name, color]) => ({ name, color, el: null, area: 0 }))
  const types = [[], road1, road2, road3].map(arr => ({arr, svg: initSvg(arr)}))
  const typesImage = types.map(({ svg }) => {
    const blob = new Blob([svg.outerHTML], {type: 'image/svg+xml'})
    const src = URL.createObjectURL(blob)
    return setAttr(create('img'), { src, width: 295 })
  })
  const render = () => `
    <div class="admin__canvas">
      <div id="top1" class="svgCanvasTop"></div>
      <div id="top2" class="svgCanvasTop"></div>
      <svg id="svgCanvas" width="${width}" height="${height}">${road0.innerHTML}</svg>
      <div class="cols">${cols.map(v => `<span>${v+1}</span>`).join('')}</div>
      <div class="rows">${rows.map(v => `<span>${v+1}</span>`).join('')}</div>
    </div>
    <div>
      <select id="boothList">
        ${boothList.map(({ name }, key) => `<option value="${key}">${name}</option>`)}
      </select>
      <span id="area">0 ㎡</span>
      <a href="#" id="saveSite" class="btn btn__main">저장</a>
      <a href="#" id="deleteSite" class="btn btn__default">삭제</a>
    </div>
  `
  type.html(typesImage.map(v => v.outerHTML).join(' '))
  layout.html(render())



  let booth = boothList[$('#boothList').val()], currentType = road0
  let rect, temp, attr1, attr2, initX, initY, drawState = false

  const selectBooth = e => booth = boothList[e.currentTarget.value]
  const selectType  = e => svgCanvas.html(types[$(e.currentTarget).index()].svg.innerHTML)
  const [svgCanvas, top1, top2] = [$('#svgCanvas'), $('#top1'), $('#top2')]
  const convert = n => ~~(n/unit)*unit
  const drawStart = (x, y) => {
    initX = x, initY = y
    drawState = true
    top1.addClass('active')
    attr1 = { stroke: '#666', 'stroke-width': 1, fill: 'none', x, y }
    attr2 = { fill: '#ffa', x: convert(x), y: convert(y) }
    rect = setAttr(createNS('rect'), attr1)
    temp = setAttr(createNS('rect'), attr2)
    svgCanvas.prepend(temp).append(rect)
  }
  const drawing = (x, y) => {
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
    const bool = Math.min(...getAttr(temp, 'width', 'height')) > unit
    drawState = false
    rect = rect.remove()
    bool ? svgCanvas.append(setAttr(temp, {fill: booth.color})) : temp = temp.remove()
    booth.el = (booth.el && booth.el.remove(), temp)
    top1.removeClass('active')
  }
  const draw = e => {
    const {top, left} = $(e.currentTarget).offset()
    let [x, y] = [e.pageX - left, e.pageY - top]
    switch (e.type) {
      case 'mousedown' : if (!drawState) drawStart(x, y); break
      case 'mousemove' : if (drawState) drawing(x, y); break
      case 'mouseup' : if (drawState) drawEnd(); break
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
          moveState = false
          top2.removeClass('active')
        break;
      }
    }
  })();

  $(document)
    .on('change', '#boothList', selectBooth)
    .on('click', '#type img', selectType)
    .on('mousedown', '#svgCanvas', draw)
    .on('mouseup mouseleave mousemove', '#top1', draw)
    .on('mousedown', '#svgCanvas rect', move)
    .on('mouseup mouseleave mousemove', '#top2', move)
}

app()