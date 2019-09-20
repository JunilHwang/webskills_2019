// util functions
const create = ele => document.createElement(ele)
const createNS = ele => document.createElementNS('http://www.w3.org/2000/svg', ele)
const setAttr = (target, attr) => {
  for (const key in attr) { target.setAttribute(key, attr[key]) }
  return target
}
const getAttr = (target, attr) => target.attributes[attr].value

// variables
const cols = [...(new Array(80)).keys()]
const rows = [...(new Array(40)).keys()]
const width = 1200, height = 600, unit = 15

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
    ${type.length ? type.map(([x, y]) => setAttr(createNS('rect'), { ...rectAttr, x: ((x-1)*unit), y: ((y-1)*unit)}).outerHTML).join('') : ''}
  `
  return svg
}
const app = async () => {
  const saved = $('#saved'), layout = $('#layout'), type = $('#type')
  const road0 = initSvg()
  const {road1, road2, road3, ...json} = await fetch('./data/plan.json').then(res => res.json())
  const colors = Object.entries(json.color).map(([k, v]) => ({ k, v, el: null }))
  layout.html(`
    <div class="admin__canvas">
      <div id="svgCanvasTop1" class="svgCanvasTop"></div>
      <div id="svgCanvasTop2" class="svgCanvasTop"></div>
      <svg id="svgCanvas" width="${width}" height="${height}">${road0.innerHTML}</svg>
      <div class="cols">${cols.map(v => `<span>${v+1}</span>`).join('')}</div>
      <div class="rows">${rows.map(v => `<span>${v+1}</span>`).join('')}</div>
    </div>
    <div>
      <select id="colors">
        ${colors.map(({k, v}, key) => `<option value="${key}">${k}</option>`)}
      </select>
      <span id="area">0 ㎡</span>
      <a href="#" id="saveSite" class="btn btn__main">저장</a>
      <a href="#" id="deleteSite" class="btn btn__default">삭제</a>
    </div>
  `)
  const types = [road0, road1, road2, road3].map(v => initSvg(v))
  const typesImage = types.map(v => {
    const blob = new Blob([v.outerHTML], {type: 'image/svg+xml'})
    const src = URL.createObjectURL(blob)
    return setAttr(create('img'), { src, width: 295 })
  })
  type.html(typesImage.map(v => v.outerHTML).join(' '))


  let color = colors[$('#colors').val()], currentType = road0
  const selectColor = e => color = colors[e.currentTarget.value]
  const selectType = e => {
    const idx = $(e.currentTarget).index()
    $('#svgCanvas').html(types[idx].innerHTML)
  }
  let rect, temp, attr1, attr2, initX, initY, drawState = false
  const svgCanvas = $('#svgCanvas'), svgCanvasTop1 = $('#svgCanvasTop1'), svgCanvasTop2 = $('#svgCanvasTop2')
  const convert = n => ~~(n/unit)*unit
  const drawStart = (x, y) => {
    initX = x, initY = y
    drawState = true
    svgCanvasTop1.addClass('active')
    attr1 = { stroke: '#666', 'stroke-width': 1, 'fill': 'none', x, y }
    attr2 = { 'fill': '#ffa', x: convert(x), y: convert(y) }
    rect = setAttr(createNS('rect'), attr1)
    temp = setAttr(createNS('rect'), attr2)
    svgCanvas.prepend(temp)
    svgCanvas.append(rect)
  }
  const drawing = (x, y) => {
    const w = x - initX, h = y - initY
    const width = Math.abs(w), height = Math.abs(h)
    let width2 = Math.abs(convert(x+unit) - convert(initX)),
        height2 = Math.abs(convert(y+unit) - convert(initY))
    if (w < 0) {
      attr1.x = x
      attr2.x = convert(x)
      width2 += unit*2
    }
    if (h < 0) {
      attr1.y = y
      attr2.y = convert(y)
      height2 += unit*2
    }
    setAttr(rect, {...attr1, width, height})
    setAttr(temp, {...attr2, width: width2, height: height2})
  }
  const drawEnd = () => {
    drawState = false
    rect.remove()
    rect = null
    if (getAttr(temp, 'width')*1 > unit && getAttr(temp, 'height')*1 > unit) {
      temp.setAttribute('fill', color.v)
      svgCanvas.append(temp)
    } else {
      temp = null
    }
    color.el = (color.el && color.el.remove(), temp)
    svgCanvasTop1.removeClass('active')

  }
  const draw = e => {
    const {pageX, pageY} = e
    const {top, left} = $(e.currentTarget).offset()
    let x, y
    switch (e.type) {
      case 'mousedown' :
        if (e.type === 'mousedown' && color === '') {
          alert('색상을 선택해주세요')
          return
        }
        if (drawState) return
        [x, y] = [pageX - left, pageY - top]
        drawStart(x, y)
      break
      case 'mousemove' :
        if (!drawState) return
        [x, y] = [pageX - left, pageY - top]
        drawing(x, y)
      break
      case 'mouseup' :
        if (drawState) drawEnd()
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
          [originX, originY] = [getAttr(selected, 'x')*1, getAttr(selected, 'y')*1];
          [w, h] = [getAttr(selected, 'width')*1, getAttr(selected, 'height')*1]
          svgCanvasTop2.addClass('active')
        break;
        case 'mousemove' :
          if (!moveState) return
          const [moveX, moveY] = [originX + convert(x - beforeX), originY + convert(y - beforeY)]
          const xChk = (w + moveX <= width) && (moveX >= 0)
          const yChk = (h + moveY <= height) && (moveY >= 0)
          const attr = {}
          if (xChk) attr.x = moveX
          if (yChk) attr.y = moveY
          setAttr(selected, attr)
        break;
        case 'mouseleave' :
        case 'mouseup' :
          if (!moveState) return
          moveState = false
          svgCanvasTop2.removeClass('active')
        break;
      }
    }
  })();

  $(document)
    .on('change', '#colors', selectColor)
    .on('click', '#type img', selectType)
    .on('mousedown', '#svgCanvas', draw)
    .on('mouseup mouseleave mousemove', '#svgCanvasTop1', draw)
    .on('mousedown', '#svgCanvas rect', move)
    .on('mouseup mouseleave mousemove', '#svgCanvasTop2', move)
}

app()