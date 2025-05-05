const images = [
  "./assets/bent.png",
  "./assets/headH.png",
  "./assets/headV.png",
  "./assets/deadH.png",
  "./assets/deadV.png",
  "./assets/rushH.png",
  "./assets/rushV.png",
  "./assets/sleep.png",
  "./assets/straightH.png",
  "./assets/straightV.png",
  "./assets/tailH.png",
  "./assets/tailV.png",
  "./assets/food1.png",
  "./assets/food2.png",
  "./assets/food3.png",
  "./assets/hole.png",
  "./assets/speed_default.png",
  "./assets/speed_hold.png",
  "./assets/pause_default.png",
  "./assets/pause_hold.png",
  "./assets/gameOverPanel1.png",
  "./assets/gameOverPanel2.png",
  "./assets/gameOverPanel3.png",
  "./assets/pause_musicOFF.png",
  "./assets/pause_musicON.png",
  "./assets/keyboard_default.png",
  "./assets/up_hold.png",
  "./assets/down_hold.png",
  "./assets/left_hold.png",
  "./assets/right_hold.png",
  "./assets/tip.png",
  "./assets/bg.png",
  "./assets/line.png",
  "./assets/bg3.png",
  "./assets/bg4.png",
]

let loadedCount = 0
let loadingWindowHeight, loadingWindowWidth, loadingWidth, loadingHeight, loadingTop, loadingTextLeft, loadingFont
const totalAssets = images.length
const progress = document.querySelector('.loadingText')
const loadingContainer = document.querySelector('.loadingContainer')
const loadingImg = document.querySelector('.loadingImg')
const loadingText = document.querySelector('.loadingText')

loadingResize()
images.forEach(loadImage)

function loadImage(url) {
  const asset = new Image()
  asset.onload = () => {
    loadedCount++
    progress.innerHTML = 'LOADING…' + trans(loadedCount, totalAssets) + '%'
    if (loadedCount === totalAssets) {
      addScript()
      loadingContainer.style.visibility = 'hidden'
    }
  }
  asset.src = url
}

//转化为百分比
function trans(fz, fm) {
  return parseInt(fz * 100 / fm)
}

function addScript() {
  const script = document.createElement('script')
  script.src = './scripts/eventListener.js'
  document.head.appendChild(script)

  const link = document.createElement('link')
  link.rel = "stylesheet"
  link.href = "./styles/loading.css"
  document.head.appendChild(link)
}

function loadingResize() {
  loadingWindowHeight = window.innerHeight
  loadingWindowWidth = window.innerWidth
  loadingFont = 17 / 659 * loadingWindowHeight

  //loading界面
  loadingContainer.style.height = loadingWindowHeight + 'px'
  loadingContainer.style.width = loadingWindowWidth + 'px'
  loadingContainer.style.top = 0
  loadingContainer.style.left = 0

  //loading图案
  loadingHeight = 137 / 659 * loadingWindowHeight
  loadingWidth = 350 / 659 * loadingWindowHeight
  loadingTop = 160 / 659 * loadingWindowHeight

  loadingImg.style.height = loadingHeight + 'px'
  loadingImg.style.width = loadingWidth + 'px'
  loadingImg.style.top = loadingTop + 'px'
  loadingImg.style.left = (loadingWindowWidth - loadingWidth) / 2 + 'px'

  //loading文字
  loadingText.style.top = loadingTop + 145 / 659 * loadingWindowHeight + 'px'
  loadingText.style.left = loadingWindowWidth / 2 - 60 / 659 * loadingWindowHeight + 'px'
  loadingText.style.fontSize = loadingFont + 'px'
}

document.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, { passive: false })

document.addEventListener('touchmove', function (e) {
  e.preventDefault()
}, { passive: false })

window.addEventListener('resize', loadingResize)