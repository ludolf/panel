import { LudolfC, lang } from 'ludolfc'
import { display, resetDisplay } from './display'
import map from './map'
import robot from './robot'
import rocket from './rocket'
import { changeLocale, snippet, errorMsg } from './localization'

const displayLang = new lang.NativeFunction((...input) => display(...input))

const imports = {
    Display: displayLang, Zobraz: displayLang, Anzeigen: displayLang,
    Map: map.mapped, Mapa: map.mapped, Karte: map.mapped,
    Rocket: rocket.mapped, Raketa: rocket.mapped, Rakete: rocket.mapped,
    Ludolf: robot.mapped,
}

let interrupted = false
const controls = { isInterrupted: () => interrupted }

const ludolfC = new LudolfC(imports, controls)

const codeTextarea = document.getElementById('code')
const positionDiv = document.getElementById('position')
const errorMarker = document.getElementById('errorMarker')
const lineNumbers = document.querySelector('.line-numbers')
const displayDiv = document.getElementById('display')
const resultDiv = document.getElementById('result')
const runButton = document.getElementById('runButton')
const controlChars = document.querySelectorAll('.controls .char')
const mapTable = document.getElementById('map')

let running = false
runButton.addEventListener('click', async () => {
    if (running) {
        interrupted = true
        return
    }
    running = true
    resetMarker()
    resetDisplay()
    saveCodeToLocalStorage()
    runButton.classList.remove('run')
    runButton.classList.add('stop')
    mapTable.classList.remove('interrupted')

    displayDiv.focus()

    // reset scene to initial state
    map.reset()
    robot.reset()

    if (resultDiv.classList.contains('error')) resultDiv.classList.remove('error')
    try {
        const result = await ludolfC.execute(codeTextarea.value)
        display(result)
    } catch (e) {
        mapTable.classList.add('interrupted')
        if (e.isLangInterruption) {
            resultDiv.innerHTML += '\n<div class="error">❌⛔❌</div>'
            return
        }
        console.error(e)
        if (!resultDiv.classList.contains('error')) resultDiv.classList.add('error')
        if (e.isLangError) {
            const line = e.line || 0
            const col = e.col || 0            
            const type = (e.isParseError ? 'PARSE ' : '') + 'ERROR'
            const pos = (line && col ? '(ln ' + line + ', col ' + col + ')' : '')
            resultDiv.innerHTML = type + ' ' + pos + ':<br>' + errorMsg(e.id) + ' ' + e.details
            console.error(type, pos, e.message)
            markError(line, e.col)
        } else {
            resultDiv.innerHTML = 'ERROR ' + e
            console.error(e)
        }
    } finally {
        runButton.classList.add('run')
        runButton.classList.remove('stop')
        interrupted = false
        running = false
    }
})

function fillTextareLines() {
    const numberOfLines = codeTextarea.value.split('\n').length
    lineNumbers.innerHTML = Array(numberOfLines)
        .fill('<span></span>')
        .join('')
    
}
loadCodeFromLocalStorage()
fillTextareLines()
codeTextarea.addEventListener('keyup', event => {
    calculatePosition()
    fillTextareLines()
    resetMarker()
    saveCodeToLocalStorage()
})
codeTextarea.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
        insertCode('  ')
        event.preventDefault()        
    }
})
codeTextarea.addEventListener('mouseup', event => calculatePosition())

controlChars.forEach(el => el.addEventListener('click', event => insertCode(el.innerHTML)))

function insertCode(toInsert) {
    toInsert = toInsert.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
    const start = codeTextarea.selectionStart
    const end = codeTextarea.selectionEnd
    codeTextarea.value = codeTextarea.value.substring(0, start) + toInsert + codeTextarea.value.substring(end)
    codeTextarea.selectionEnd = start + 1
    codeTextarea.focus()
}

function calculatePosition() {
    const value = codeTextarea.value
    const current = codeTextarea.selectionEnd
    let line = 1
    let pos = 1
    for (let i = 0; i < value.length && i < current; i++) {
        pos++
        if (value[i] === '\n') {
            line++
            pos = 1
        }
    }
    positionDiv.innerHTML = line + ':' + pos
}

let errorMarker_line
let errorMarker_pos
function markError(line, pos) {
    resetMarker()
    if (!line || !pos) return
    errorMarker_line = line
    errorMarker_pos = pos
    
    let {top} = documentOffsetPosition(lineNumbers)
    const {left} = documentOffsetPosition(codeTextarea)
    top += lineNumbers.childNodes[0].offsetHeight * (line - 1)

    const wid = errorMarker.offsetWidth

    const copy = errorMarker.cloneNode(true)
    copy.id = errorMarker.id + '-copy'
    copy.style.visibility = 'visible'
    copy.style.letterSpacing = (wid * 4) + 'px'
    copy.style.top = top + 'px'
    copy.style.left = left + wid + (wid * pos - (wid * 3)) + 'px'
    errorMarker.parentNode.insertBefore(copy, errorMarker)

    function documentOffsetPosition(el) {
        let top = 0, left = 0;
        while (el !== null) {
            top += el.offsetTop;
            left += el.offsetLeft;
            el = el.offsetParent;
        }
        return {top, left};
    }
}
function resetMarker() {
    const copy = document.getElementById(errorMarker.id + '-copy')
    if (copy) copy.remove()

    errorMarker_line = null
    errorMarker_pos = null
}
function saveCodeToLocalStorage() {
    localStorage.setItem('ludolfcCode', codeTextarea.value)
}

function loadCodeFromLocalStorage() {
    const code = localStorage.getItem('ludolfcCode')
    if (code) codeTextarea.value = code
    else codeTextarea.value = snippet()
}

function onPageReload() {
    displayDiv.style.height = displayDiv.offsetWidth + 'px'
    if (errorMarker_line && errorMarker_pos) markError(errorMarker_line, errorMarker_pos)
}
onPageReload()

addEventListener("resize", event => onPageReload())

document.querySelectorAll('.localization-control').forEach(lc => lc.addEventListener('click', () => {
    changeLocale(lc.getAttribute('lang'))
    loadCodeFromLocalStorage()
}))
