const images = [
  "./assets/bent.png",
  "./assets/bg.png",
  "./assets/bg3.png",
  "./assets/bg4.png",
  "./assets/deadH.png",
  "./assets/deadV.png",
  "./assets/down_hold.png",
  "./assets/food1.png",
  "./assets/food2.png",
  "./assets/food3.png",
  "./assets/gameOverPanel1.png",
  "./assets/gameOverPanel2.png",
  "./assets/gameOverPanel3.png",
  "./assets/headH.png",
  "./assets/headV.png",
  "./assets/hole.png",
  "./assets/keyboard_default.png",
  "./assets/left_hold.png",
  "./assets/line.png",
  "./assets/pause_default.png",
  "./assets/pause_hold.png",
  "./assets/pause_musicOFF.png",
  "./assets/pause_musicON.png",
  "./assets/right_hold.png",
  "./assets/rushH.png",
  "./assets/rushV.png",
  "./assets/sleep.png",
  "./assets/speed_default.png",
  "./assets/speed_hold.png",
  "./assets/straightH.png",
  "./assets/straightV.png",
  "./assets/tailH.png",
  "./assets/tailV.png",
  "./assets/tip.png",
  "./assets/up_hold.png"
]

const BGMs = [
  "./sounds/CuteJump.mp3"
]

let loadedCount = 0
const totalAssets = images.length + BGMs.length
const progress = document.getElementById('test')

function loadImage(url) {
  const asset = new Image()
  asset.onload = () => {
    loadedCount++
    progress.innerHTML = loadedCount
    if (loadedCount === totalAssets) addScript()
  }
  asset.src = url
}

function loadBGM(url) {
  const asset = new Audio()
  asset.onload = () => {
    loadedCount++
    progress.innerHTML = loadedCount
    if (loadedCount === totalAssets) addScript()
  }
  asset.src = url
}

function addScript() {
  const script = document.createElement('script')
  script.src = './scripts/eventListener.js'
  document.head.appendChild(script)
}

images.forEach(loadImage)
BGMs.forEach(loadBGM)