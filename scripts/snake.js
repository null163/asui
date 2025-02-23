const cellSize = 22            //每个格子的大小
const areaSize = cellSize * 12 //游戏区域的大小
let moveSpeed                  //移动速度
let defaultSpeed               //默认速度
let rushSpeed                  //冲刺速度
let tailSpeed                  //尾巴变短速度
let foodSpeed                  //食物移动速度
let maxScore = Number(localStorage.getItem('maxScore'))
let totalScore                 //总分数
let snakeScore                 //储存分数
let bound1                     //第一阶段分数
let bound2                     //第二阶段分数
let tail                       //尾巴要加多长
let speedUp                    //是否加速
let eatFood                    //是否吃到食物
let holeExist                  //洞口是否已出现
let firstHole                  //是否为第一个洞口
let musicIsOn                  //音乐是否开启
let gameOn                     //初始状态
let gameOver                   //死亡状态
let pause                      //暂停状态
let settle                     //结算状态
let settling                   //结算中

let snake             //蛇的位置
let food              //食物的位置
let movingFood = []   //食物的位置(固定路线)
let movingFood2 = []   //食物的位置(随机移动)
let foodWeight = []   //食物权重
let hole              //洞的位置

const body = document.querySelector('body')
const whole = document.querySelector('.whole')
const scoreAnimate = document.querySelector('.scoreAnimate')
const head = document.querySelector('.bgHead')
const game = document.querySelector('.background')
const keyboard = document.querySelector('.bgKeyboard')
const gameContainer = document.querySelector('.background')
const pauseButton = document.querySelector('.pause')
const speedButton = document.querySelector('.speedUp')
const dirControlButton = document.querySelector('.dirControl')
const scoreText = document.querySelector('.score')
const tip = document.querySelector('.tip')

const pausePanelContainer = document.querySelector('.pausePanelContainer')
const pausePanel = document.querySelector('.pausePanel')
const musicON = document.querySelector('.musicON')
const continueButton = document.querySelector('.continue')

const gameOverPanelContainer = document.querySelector('.gameOverPanelContainer')
const gameOverPanel = document.querySelector('.gameOverPanel')
const again = document.querySelector('.again')

const maxScoreText = document.querySelector('.maxScore')
const currentScoreText = document.querySelector('.currentScore')
const key = document.querySelector('.key')

let windowHeight, bodySize, gameWidth, headHeight, headWidth, dirControlWidth
let keyboardHeight, buttonWidth, buttonTop1, buttonTop2, buttonLeft, i, goTop
let keyboardTop, keyboardLeft, score1, score2, font, letter, Left, Top
let tipWidth, tipHeight, tipTop, tipLeft, windowWidth, pausePanelHeight
let pausePanelWidth, pausePanelTop, pausePanelLeft, againTop, againLeft
let musicWidth, musicHeight, musicTop, musicLeft, continueHeight, againWidth
let continueWidth, continueTop, continueLeft, goHeight, goWidth, scAniWidth
let maxScore1, maxScore2, currentScore1, currentScore2, scAniHeight, scAniFont1

let keyFrames, timing, animation, scAniOutline, keyFrames2, timing2, keyFrames3

//按屏幕比例缩放
function resize() {
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth

  bodySize = 1000 / 659 * windowHeight
  gameWidth = 286 / 659 * windowHeight
  headHeight = 152 / 659 * windowHeight
  headWidth = 308 / 659 * windowHeight
  keyboardHeight = 221 / 659 * windowHeight
  Top = (152 - 5) / 659 * windowHeight
  Left = (308 - 286) / 2 / 659 * windowHeight

  score1 = 123 / 659 * windowHeight
  score2 = 110 / 659 * windowHeight
  font = 17 / 659 * windowHeight
  letter = 1 / 659 * windowHeight

  buttonWidth = 53 / 659 * windowHeight  //圆按钮直径
  buttonTop1 = 25 / 659 * windowHeight
  buttonTop2 = 100 / 659 * windowHeight
  buttonLeft = 32 / 659 * windowHeight

  dirControlWidth = 157 / 659 * windowHeight  //方向键边长
  keyboardTop = 12 / 659 * windowHeight
  keyboardLeft = 115 / 659 * windowHeight

  tipWidth = 185 / 659 * windowHeight
  tipHeight = 250 / 659 * windowHeight
  tipTop = 350 / 659 * windowHeight
  tipLeft = (windowWidth + gameWidth) / 2 + 50 / 659 * windowHeight

  pausePanelHeight = 150 / 659 * windowHeight
  pausePanelWidth = 225 / 659 * windowHeight
  pausePanelTop = 205 / 659 * windowHeight
  pausePanelLeft = windowWidth / 2 - pausePanelWidth / 2 - 2

  musicWidth = 88 / 659 * windowHeight
  musicHeight = 37 / 659 * windowHeight
  musicTop = 91 / 659 * windowHeight
  musicLeft = 30 / 659 * windowHeight

  continueHeight = 36 / 659 * windowHeight
  continueWidth = 68 / 659 * windowHeight
  continueTop = 90 / 659 * windowHeight
  continueLeft = 130 / 659 * windowHeight

  goHeight = 200 / 659 * windowHeight
  goWidth = 225 / 659 * windowHeight
  goTop = 20 / 659 * windowHeight

  againWidth = 105 / 659 * windowHeight
  againTop = 145 / 659 * windowHeight
  againLeft = 63 / 659 * windowHeight

  maxScore1 = 83 / 659 * windowHeight
  maxScore2 = 107 / 659 * windowHeight

  currentScore1 = 113 / 659 * windowHeight
  currentScore2 = 105 / 659 * windowHeight

  scAniWidth = cellSize / 659 * windowHeight
  scAniHeight = cellSize / 659 * windowHeight
  scAniFont1 = 14 / 659 * windowHeight
  scAniOutline = 1.2 / 659 * windowHeight

  body.style.backgroundSize = bodySize + 'px'

  whole.style.width = headWidth + 'px'

  scoreAnimate.style.width = headWidth + 'px'
  scoreAnimate.style.height = headHeight + gameWidth + 'px'
  scoreAnimate.style.left = (windowWidth - headWidth) / 2 + 'px'

  keyFrames = [
    { fontSize: 0 + 'px' },
    { fontSize: scAniFont1 + 'px', offset: 0.15 },
    { fontSize: scAniFont1 + 'px', offset: 0.85 },
    { fontSize: 0 + 'px' }
  ]
  timing = {
    duration: 1300,
    iterations: 1,
    easing: 'ease-in-out'
  }

  head.style.height = headHeight + 'px'
  head.style.width = headWidth + 'px'
  head.style.backgroundSize = headWidth + 'px ' + headHeight + 'px'

  game.style.height = gameWidth + 'px'
  game.style.width = gameWidth + 'px'
  game.style.top = Top + 'px'
  game.style.left = Left + 'px'
  game.style.backgroundSize = gameWidth + 'px ' + gameWidth + 'px'

  keyboard.style.height = keyboardHeight + 'px'
  keyboard.style.width = gameWidth + 'px'
  keyboard.style.top = gameWidth + Top - 2 + 'px'
  keyboard.style.left = Left + 'px'
  keyboard.style.backgroundSize = gameWidth + 'px ' + keyboardHeight + 'px'

  pauseButton.style.height = buttonWidth + 'px'
  pauseButton.style.width = buttonWidth + 'px'
  pauseButton.style.backgroundSize = buttonWidth + 'px ' + buttonWidth + 'px'
  pauseButton.style.top = buttonTop1 + 'px'
  pauseButton.style.left = buttonLeft + 'px'

  speedButton.style.height = buttonWidth + 'px'
  speedButton.style.width = buttonWidth + 'px'
  speedButton.style.backgroundSize = buttonWidth + 'px ' + buttonWidth + 'px'
  speedButton.style.top = buttonTop2 + 'px'
  speedButton.style.left = buttonLeft + 'px'

  dirControlButton.style.height = dirControlWidth + 'px'
  dirControlButton.style.width = dirControlWidth + 'px'
  dirControlButton.style.backgroundSize = dirControlWidth + 'px ' + dirControlWidth + 'px'
  dirControlButton.style.top = keyboardTop + 'px'
  dirControlButton.style.left = keyboardLeft + 'px'

  scoreText.style.marginTop = score1 + 'px'
  scoreText.style.marginLeft = score2 + 'px'
  scoreText.style.fontSize = font + 'px'
  scoreText.style.letterSpacing = letter + 'px'

  tip.style.height = tipHeight + 'px'
  tip.style.width = tipWidth + 'px'
  tip.style.backgroundSize = tipWidth + 'px ' + tipHeight + 'px'
  tip.style.top = tipTop + 'px'
  tip.style.left = tipLeft + 'px'

  pausePanelContainer.style.height = pausePanelHeight + 'px'
  pausePanelContainer.style.width = pausePanelWidth + 'px'
  pausePanelContainer.style.backgroundSize = pausePanelWidth + 'px ' + pausePanelHeight + 'px'
  pausePanelContainer.style.top = pausePanelTop + 'px'
  pausePanelContainer.style.left = pausePanelLeft + 'px'

  pausePanel.style.height = pausePanelHeight + 'px'
  pausePanel.style.width = pausePanelWidth + 'px'
  pausePanel.style.backgroundSize = pausePanelWidth + 'px ' + pausePanelHeight + 'px'

  keyFrames2 = [
    { height: 0 + 'px', width: 0 + 'px', backgroundSize: '0px 0px' },
    { height: pausePanelHeight + 'px', width: pausePanelWidth + 'px', backgroundSize: `${pausePanelWidth}px ${pausePanelHeight}px` }
  ]

  timing2 = {
    duration: 250,
    iterations: 1,
    easing: 'ease-in-out'
  }

  musicON.style.height = musicHeight + 'px'
  musicON.style.width = musicWidth + 'px'
  musicON.style.backgroundSize = musicWidth + 'px ' + musicHeight + 'px'
  musicON.style.top = musicTop + 'px'
  musicON.style.left = musicLeft + 'px'

  continueButton.style.height = continueHeight + 'px'
  continueButton.style.width = continueWidth + 'px'
  continueButton.style.backgroundSize = continueWidth + 'px ' + continueHeight + 'px'
  continueButton.style.top = continueTop + 'px'
  continueButton.style.left = continueLeft + 'px'

  gameOverPanelContainer.style.height = goHeight + 'px'
  gameOverPanelContainer.style.width = goWidth + 'px'
  gameOverPanelContainer.style.top = goTop + 'px'
  gameOverPanelContainer.style.left = pausePanelLeft + 'px'

  gameOverPanel.style.height = goHeight + 'px'
  gameOverPanel.style.width = goWidth + 'px'
  gameOverPanel.style.backgroundSize = goWidth + 'px ' + goHeight + 'px'

  keyFrames3 = [
    { height: 0 + 'px', width: 0 + 'px', backgroundSize: '0px 0px' },
    { height: goHeight + 'px', width: goWidth + 'px', backgroundSize: `${goWidth}px ${goHeight}px` }
  ]

  again.style.height = continueHeight + 'px'
  again.style.width = againWidth + 'px'
  again.style.top = againTop + 'px'
  again.style.left = againLeft + 'px'
  again.style.backgroundSize = againWidth + 'px ' + continueHeight + 'px'

  maxScoreText.style.top = maxScore1 + 'px'
  maxScoreText.style.left = maxScore2 + 'px'
  maxScoreText.style.fontSize = font + 'px'
  maxScoreText.style.letterSpacing = letter + 'px'

  currentScoreText.style.top = currentScore1 + 'px'
  currentScoreText.style.left = currentScore2 + 'px'
  currentScoreText.style.fontSize = font + 'px'
  currentScoreText.style.letterSpacing = letter + 'px'

  key.style.height = dirControlWidth + 'px'
  key.style.width = dirControlWidth + 'px'
  key.style.backgroundSize = dirControlWidth + 'px ' + dirControlWidth + 'px'
  key.style.top = keyboardTop + 'px'
  key.style.left = keyboardLeft + 'px'

}

window.addEventListener('resize', function () {
  resize()
  drawGame()
})

resize()
init()

function init() { //初始化
  defaultSpeed = 300
  rushSpeed = 190
  moveSpeed = defaultSpeed
  tailSpeed = 50
  foodSpeed = 400
  totalScore = 0
  snakeScore = 0
  bound1 = 100
  bound2 = 500
  scoreRefresh(0)
  tail = 0
  speedUp = false
  eatFood = false
  holeExist = false
  firstHole = true
  musicIsOn = true
  gameOn = false
  gameOver = false
  pause = false
  settle = false
  settling = false
  snake = [{ x: 6, y: 6, dirX: 0, dirY: 1 }]
  foodWeight = [3, 2, 1]
  food = []
  movingFood = []
  movingFood2 = []
  hole = {}
  maxScoreText.style.visibility = 'hidden'
  currentScoreText.style.visibility = 'hidden'
  drawGame()
}

function animateFun(score) {  //分数动画
  const scAniText = document.createElement('div')
  scAniText.classList.add('scAniText')
  scAniText.innerHTML = '+' + score
  scAniText.style.width = scAniWidth + 'px'
  scAniText.style.height = scAniHeight + 'px'
  scAniText.style.textShadow = `-${scAniOutline}px -${scAniOutline}px 0 #ffffff, ${scAniOutline}px -${scAniOutline}px 0 #ffffff, -${scAniOutline}px ${scAniOutline}px 0 #ffffff, ${scAniOutline}px ${scAniOutline}px 0 #ffffff`
  scAniText.style.top = Top + (snake[0].y - 1) * cellSize / 659 * windowHeight + 'px'
  scAniText.style.left = Left + snake[0].x * cellSize / 659 * windowHeight + 'px'
  scoreAnimate.appendChild(scAniText)
  animation = scAniText.animate(keyFrames, timing)
  setTimeout(function () { scoreAnimate.removeChild(scAniText) }, 1300)
}

function startLoop() {  //开启所有循环
  foodLoop()
  gameLoop()
}

function gameLoop() { //主循环
  if (!pause) {
    if (!gameOver) whetherBumpSnake()
    if (!gameOver && snake.length > 2) whetherEnterHole()
    if (!gameOver && !settle) moveSnake()
    if (!gameOver && !settle) {
      if ((firstHole || snake.length > 15) && !holeExist) holeApply()
      whetherEatFood()
      if (!eatFood) deleteTail()
      else if (tail === 0) {
        eatFood = false
        deleteTail()
      }
      else tail -= 1
      drawGame()
      if (gameOn) setTimeout(gameLoop, moveSpeed)
    }
  }
}

function foodLoop() {  //食物循环
  moveFood()
  drawGame()
  if (gameOn && !pause && !gameOver && !settle) setTimeout(foodLoop, foodSpeed)
}

function whetherEatFood() { //判断是否吃到食物
  food.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y) {
      eatFood = true
      animateFun(obj.id * 5)
      snakeScore += obj.id * 5
      tail += obj.id
      food.splice(idx, 1)
    }
  })
  movingFood.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y || snake[1].x === obj.x && snake[1].y === obj.y) {
      eatFood = true
      animateFun(obj.id * 5)
      snakeScore += obj.id * 5
      tail += obj.id
      movingFood.splice(idx, 1)
    }
  })
  movingFood2.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y || snake[1].x === obj.x && snake[1].y === obj.y) {
      eatFood = true
      animateFun(obj.id * 5)
      snakeScore += obj.id * 5
      tail += obj.id
      movingFood2.splice(idx, 1)
    }
  })
  if (food.length + movingFood.length + movingFood2.length < 3) foodApplyAll()
}

function whetherBumpSnake() { //判断是否撞到蛇身
  for (let idx = 2; idx < snake.length - 1; idx++) {
    if (snake[0].x === snake[idx].x && snake[0].y - 1 === snake[idx].y && snake[0].dirY === -1) {
      GameOver()
      return
    }
    else if (snake[0].x - 1 === snake[idx].x && snake[0].y === snake[idx].y && snake[0].dirX === -1) {
      GameOver()
      return
    }
    else if (snake[0].x + 1 === snake[idx].x && snake[0].y === snake[idx].y && snake[0].dirX === 1) {
      GameOver()
      return
    }
    else if (snake[0].x === snake[idx].x && snake[0].y + 1 === snake[idx].y && snake[0].dirY === 1) {
      GameOver()
      return
    }
  }
}

function whetherEnterHole() { //判断是否进入洞口
  if (snake[0].x === hole.x && snake[0].y - 1 === hole.y && snake[0].dirY === -1 && !(snake[1].x === hole.x && snake[1].y === hole.y)) {
    settleScore()
    return
  }
  else if (snake[0].x - 1 === hole.x && snake[0].y === hole.y && snake[0].dirX === -1 && !(snake[1].x === hole.x && snake[1].y === hole.y)) {
    settleScore()
    return
  }
  else if (snake[0].x + 1 === hole.x && snake[0].y === hole.y && snake[0].dirX === 1 && !(snake[1].x === hole.x && snake[1].y === hole.y)) {
    settleScore()
    return
  }
  else if (snake[0].x === hole.x && snake[0].y + 1 === hole.y && snake[0].dirY === 1 && !(snake[1].x === hole.x && snake[1].y === hole.y)) {
    settleScore()
    return
  }
}

function settleScore() { //结算分数
  settle = true
  settling = true
  holeExist = false
  i = totalScore
  scoreRefreshLoop()
  if (totalScore < bound1 && totalScore + snakeScore >= bound1) {
    let i1 = myRandom(1, 4)
    // if (i1 === 1) foodApply1(1)
    // else if (i1 === 2) foodApply2(1)
    // else if (i1 === 3) foodApply3(1)
    // else if (i1 === 4) foodApply4(1)
  }
  else if (totalScore < bound2 && totalScore + snakeScore >= bound2) {
    let i2 = myRandom(1, 4)
    // if (i2 === 1) foodApply1(2)
    // else if (i2 === 2) foodApply2(2)
    // else if (i2 === 3) foodApply3(2)
    // else if (i2 === 4) foodApply4(2)
  }
  totalScore += snakeScore
  snakeScore = 0
  drawGame()
  hole = {}
  settleLoop()
}

function settleLoop() { //结算循环
  deleteTail()
  drawGame()
  if (snake.length > 2) setTimeout(settleLoop, tailSpeed)
  else settling = false
}

function scoreRefresh(sc) { //分数更新
  if (sc > 9999999999) sc = 9999999999
  let t = 0
  let s = sc
  while (s > 0) {
    s = parseInt(s) / 10
    t++
  }
  if (sc === 0) t = 2
  let str = ""
  for (let i = 10 - t; i >= 0; i--) {
    str += "0"
  }
  str += sc
  scoreText.innerHTML = str
}

function scoreRefreshLoop() { //分数更新循环
  scoreRefresh(i)
  i += 1
  if (i <= totalScore + snakeScore) setTimeout(scoreRefreshLoop, 25)
}

function drawGame() { //打印贴图
  gameContainer.innerHTML = "";

  //打印洞口
  if (holeExist) {
    const img = document.createElement("img")
    img.style.top = hole.y * cellSize / 659 * windowHeight + 'px'
    img.style.left = hole.x * cellSize / 659 * windowHeight + 'px'
    img.classList.add('object')
    img.style.width = cellSize / 659 * windowHeight + 'px'
    img.style.height = cellSize / 659 * windowHeight + 'px'
    img.src = './assets/hole.png'
    gameContainer.appendChild(img)
  }

  //打印头部
  const head = document.createElement("img")
  head.style.top = snake[0].y * cellSize / 659 * windowHeight + 'px'
  head.style.left = snake[0].x * cellSize / 659 * windowHeight + 'px'
  head.classList.add('object')
  head.style.width = cellSize / 659 * windowHeight + 'px'
  head.style.height = cellSize / 659 * windowHeight + 'px'

  if (!gameOn && !gameOver) {
    head.src = './assets/sleep.png'
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === 1) {
    if (gameOver) head.src = './assets/deadV.png'
    else head.src = './assets/headV.png'
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === -1) {
    if (gameOver) head.src = './assets/deadV.png'
    else head.src = './assets/headV.png'
    head.classList.add('flipV')
  }
  else if (snake[0].dirX === -1 && snake[0].dirY === 0) {
    if (gameOver) head.src = './assets/deadH.png'
    else head.src = './assets/headH.png'
  }
  else if (snake[0].dirX === 1 && snake[0].dirY === 0) {
    if (gameOver) head.src = './assets/deadH.png'
    else head.src = './assets/headH.png'
    head.classList.add('flipH')
  }
  else {
    if ((gameOver || settle) && snake.length > 1) {
      if (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].x === snake[0].x + 1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].x === snake[0].x - 1) {
        if (gameOver) head.src = './assets/deadV.png'
        else head.src = './assets/headV.png'
        head.classList.add('flipV')
      }
      else if (snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].x === snake[0].x + 1 || snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].x === snake[0].x - 1) {
        if (gameOver) head.src = './assets/deadV.png'
        else head.src = './assets/headV.png'
      }
      else if (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].y === snake[0].y + 1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].y === snake[0].y - 1) {
        if (gameOver) head.src = './assets/deadH.png'
        else head.src = './assets/headH.png'
      }
      else if (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].y === snake[0].y - 1 || snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].y === snake[0].y + 1) {
        if (gameOver) head.src = './assets/deadH.png'
        else head.src = './assets/headH.png'
        head.classList.add('flipH')
      }
    }
    else if (snake.length > 1) {
      if (snake[1].x === snake[0].x && snake[1].y === snake[0].y - 1) {
        head.src = './assets/headV.png'
      }
      else if (snake[1].x === snake[0].x && snake[1].y === snake[0].y + 1) {
        head.src = './assets/headV.png'
        head.classList.add('flipV')
      }
      else if (snake[1].x === snake[0].x + 1 && snake[1].y === snake[0].y) {
        head.src = './assets/headH.png'
      }
      else if (snake[1].x === snake[0].x - 1 && snake[1].y === snake[0].y) {
        head.src = './assets/headH.png'
        head.classList.add('flipH')
      }
    }
  }
  gameContainer.appendChild(head)

  //打印尾部
  if (snake.length > 1) {
    const tail = document.createElement("img")
    tail.style.top = snake[snake.length - 1].y * cellSize / 659 * windowHeight + 'px'
    tail.style.left = snake[snake.length - 1].x * cellSize / 659 * windowHeight + 'px'
    tail.classList.add('object')
    tail.style.width = cellSize / 659 * windowHeight + 'px'
    tail.style.height = cellSize / 659 * windowHeight + 'px'
    if (snake[snake.length - 1].dirX === 0 && snake[snake.length - 1].dirY === 1) {
      tail.src = './assets/tailV.png'
    }
    else if (snake[snake.length - 1].dirX === 0 && snake[snake.length - 1].dirY === -1) {
      tail.src = './assets/tailV.png'
      tail.classList.add('flipV')
    }
    else if (snake[snake.length - 1].dirX === -1 && snake[snake.length - 1].dirY === 0) {
      tail.src = './assets/tailH.png'

    }
    else if (snake[snake.length - 1].dirX === 1 && snake[snake.length - 1].dirY === 0) {
      tail.src = './assets/tailH.png'
      tail.classList.add('flipH')
    }
    else {
      if (snake[snake.length - 2].x === snake[snake.length - 1].x - 1) {
        tail.src = './assets/tailH.png'
      }
      else if (snake[snake.length - 2].x === snake[snake.length - 1].x + 1) {
        tail.src = './assets/tailH.png'
        tail.classList.add('flipH')
      }
      else if (snake[snake.length - 2].y === snake[snake.length - 1].y - 1) {
        tail.src = './assets/tailV.png'
        tail.classList.add('flipV')
      } else if (snake[snake.length - 2].y === snake[snake.length - 1].y + 1) {
        tail.src = './assets/tailV.png'
      }
    }
    gameContainer.appendChild(tail)
  }

  //打印身体
  snake.forEach((obj, idx) => {
    if (idx !== 0 && idx !== snake.length - 1) {
      const img = document.createElement("img")
      img.style.top = obj.y * cellSize / 659 * windowHeight + 'px'
      img.style.left = obj.x * cellSize / 659 * windowHeight + 'px'
      img.classList.add('object')
      img.style.width = cellSize / 659 * windowHeight + 'px'
      img.style.height = cellSize / 659 * windowHeight + 'px'
      if (obj.dirX === 0 && obj.dirY === 1) {
        img.src = './assets/straightV.png'
      }
      else if (obj.dirX === 0 && obj.dirY === -1) {
        img.src = './assets/straightV.png'
        img.classList.add('flipV')
      }
      else if (obj.dirX === -1 && obj.dirY === 0) {
        img.src = './assets/straightH.png'
      }
      else if (obj.dirX === 1 && obj.dirY === 0) {
        img.src = './assets/straightH.png'
        img.classList.add('flipH')
      }
      else {
        img.src = './assets/bent.png'
        if (obj.dirX === 1 && obj.dirY === 1) {
          img.classList.add('flipV')
        }
        else if (obj.dirX === -1 && obj.dirY === -1) {
          img.classList.add('flipH')
        }
        else if (obj.dirX === -1 && obj.dirY === 1) {
          img.classList.add('flipVH')
        }
      }
      gameContainer.appendChild(img)
    }
  })

  //打印食物
  if (gameOn) {
    food.forEach(obj => {
      const img = document.createElement("img")
      img.style.top = obj.y * cellSize / 659 * windowHeight + 'px'
      img.style.left = obj.x * cellSize / 659 * windowHeight + 'px'
      img.classList.add('object')
      img.style.width = cellSize / 659 * windowHeight + 'px'
      img.style.height = cellSize / 659 * windowHeight + 'px'
      img.src = './assets/food' + obj.id + '.png'
      gameContainer.appendChild(img)
    })
    movingFood.forEach(obj => {
      const img = document.createElement("img")
      img.style.top = obj.y * cellSize / 659 * windowHeight + 'px'
      img.style.left = obj.x * cellSize / 659 * windowHeight + 'px'
      img.classList.add('object')
      img.style.width = cellSize / 659 * windowHeight + 'px'
      img.style.height = cellSize / 659 * windowHeight + 'px'
      img.src = './assets/food' + obj.id + '.png'
      gameContainer.appendChild(img)
    })
    movingFood2.forEach(obj => {
      const img = document.createElement("img")
      img.style.top = obj.y * cellSize / 659 * windowHeight + 'px'
      img.style.left = obj.x * cellSize / 659 * windowHeight + 'px'
      img.classList.add('object')
      img.style.width = cellSize / 659 * windowHeight + 'px'
      img.style.height = cellSize / 659 * windowHeight + 'px'
      img.src = './assets/food' + obj.id + '.png'
      gameContainer.appendChild(img)
    })
  }

  //打印地图边缘线
  const img = document.createElement("img")
  img.style.height = gameWidth + 'px'
  img.style.width = gameWidth + 'px'
  img.style.top = '0px'
  img.style.left = '0px'
  img.style.position = 'absolute'
  img.src = './assets/line.png'
  gameContainer.appendChild(img)
}

function moveSnake() { //蛇移动
  //蛇移动
  let Y1 = snake[0].y + 1
  if (Y1 > areaSize / cellSize && snake[0].dirY === 1) {
    GameOver()
    return
  }

  let Y2 = snake[0].y - 1
  if (Y2 < 0 && snake[0].dirY === -1) {
    GameOver()
    return
  }

  let X1 = snake[0].x + 1
  if (X1 > areaSize / cellSize && snake[0].dirX === 1) {
    GameOver()
    return
  }

  let X2 = snake[0].x - 1
  if (X2 < 0 && snake[0].dirX === -1) {
    GameOver()
    return
  }

  if (snake[0].dirX === 0 || snake[0].dirY === 0) {
    let X = snake[0].x + snake[0].dirX
    if (X > areaSize / cellSize || X < 0) {
      GameOver()
      return
    }

    let Y = snake[0].y + snake[0].dirY
    if (Y > areaSize / cellSize || Y < 0) {
      GameOver()
      return
    }

    snake.unshift({ x: X, y: Y, dirX: snake[0].dirX, dirY: snake[0].dirY })
  }
  else if (snake.length > 1) {
    if (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].x === X2 || snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].x === X1) {
      snake.unshift({ x: snake[0].x, y: Y1, dirX: 0, dirY: 1 })
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].x === X1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].x === X2) {
      snake.unshift({ x: snake[0].x, y: Y2, dirX: 0, dirY: -1 })
    }
    else if (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].y === Y1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].y === Y2) {
      snake.unshift({ x: X2, y: snake[0].y, dirX: -1, dirY: 0 })
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].y === Y1 || snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].y === Y2) {
      snake.unshift({ x: X1, y: snake[0].y, dirX: 1, dirY: 0 })
    }
  }
}

function moveFood() {  //食物移动
  movingFood.forEach(obj => {
    if (obj.y === 2 && obj.x < 10 && judge(obj.x + 1, obj.y)) {
      obj.x++
    }
    else if (obj.x === 10 && obj.y < 10 && judge(obj.x, obj.y + 1)) {
      obj.y++
    }
    else if (obj.x > 2 && obj.y === 10 && judge(obj.x - 1, obj.y)) {
      obj.x--
    }
    else if (obj.x === 2 && obj.y > 2 && judge(obj.x, obj.y - 1)) {
      obj.y--
    }
  })
  // movingFood2.forEach(obj => {

  // })
}

function deleteTail() { //删除尾部
  if (snake.length > 2 || snake.length > 1 && settle) snake.pop()
  // console.log(snake);
}

function myRandom(x, y) { //x到y的随机整数
  return x + parseInt(Math.random() * (y + 1 - x))
}

function foodApplyAll() {
  let i = randomFood()
  if (i === 1) foodApply()
  else if (i === 2) {
    foodApply2()
  }
  else if (i === 3) {
    let X, Y
    while (true) {
      X = myRandom(0, areaSize / cellSize)
      Y = myRandom(0, areaSize / cellSize)
      if (judge(X, Y)) break
    }
    movingFood2.push({ x: 2, y: 2, nextX: 3, nextY: 2, id: 3 })
  }
}

function randomFood() {  //带权重随机生成一个食物id
  let cumuWeights = []
  let sum = 0
  foodWeight.forEach(obj => {
    sum += obj
    cumuWeights.push(sum)
  })
  let r = myRandom(1, sum)
  for (let i = 0; i < cumuWeights.length; i++) {
    if (cumuWeights[i] >= r) {
      return i + 1
    }
  }
  return myRandom(1, 3)
}

function foodApply() { //食物刷新1(位置随机，固定不动)
  let X, Y
  while (true) {
    X = myRandom(0, areaSize / cellSize)
    Y = myRandom(0, areaSize / cellSize)
    if (judge(X, Y)) break
  }
  food.push({ x: X, y: Y, id: 1 })
}

function foodApply2() {  //食物刷新2(固定路线移动)
  let f = true
  let i1 = myRandom(1, 4)
  let i2 = myRandom(2, 9)
  switch (i1) {
    case 1:
      if (judge(i2, 2)) movingFood.push({ x: i2, y: 2, id: 2 })
      else f = false
      break
    case 2:
      if (judge(10, i2)) movingFood.push({ x: 10, y: i2, id: 2 })
      else f = false
      break
    case 3:
      if (judge(i2, 10)) movingFood.push({ x: i2, y: 10, id: 2 })
      else f = false
      break
    case 4:
      if (judge(2, i2)) movingFood.push({ x: 2, y: i2, id: 2 })
      else f = false
      break
  }
  if (f) foodApply3()
}

function foodApply3() {  //食物刷新3(随机走位)
  let X, Y
  while (true) {
    X = myRandom(0, areaSize / cellSize)
    Y = myRandom(0, areaSize / cellSize)
    if (judge(X, Y)) break
  }
  movingFood2.push({ x: X, y: Y, id: 3 })
}

function foodApplyXY(X, Y, i) {  //在x,y处生成一个食物，若该位置不为空，则不生成
  if (judge(X, Y)) food.push({ x: X, y: Y, id: i })
}

function judge(X, Y) {  //判断该位置是否为空
  let f = true
  if (X < 0 || X > areaSize / cellSize || Y < 0 || Y > areaSize / cellSize) f = false
  food.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  snake.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  movingFood.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  if (holeExist && hole.x === X && hole.y === Y) f = false
  if (f) return true
  else return false
}

// function foodApply1(id) {  //矩形
//   let x1 = 6, y1 = 1, i1 = 1;
//   (function fn1() {
//     foodApplyXY(x1, y1, id)
//     drawGame()
//     if (i1 < 5) setTimeout(fn1, foodSpeed)
//     x1--
//     y1++
//     i1++
//   })();

//   let x2 = 1, y2 = 6, i2 = 1;
//   (function fn2() {
//     foodApplyXY(x2, y2, id)
//     drawGame()
//     if (i2 < 5) setTimeout(fn2, foodSpeed)
//     x2++
//     y2++
//     i2++
//   })();

//   let x3 = 6, y3 = 11, i3 = 1;
//   (function fn3() {
//     foodApplyXY(x3, y3, id)
//     drawGame()
//     if (i3 < 5) setTimeout(fn3, foodSpeed)
//     x3++
//     y3--
//     i3++
//   })();

//   let x4 = 11, y4 = 6, i4 = 1;
//   (function fn4() {
//     foodApplyXY(x4, y4, id)
//     drawGame()
//     if (i4 < 5) setTimeout(fn4, foodSpeed)
//     x4--
//     y4--
//     i4++
//   })();
// }

// function foodApply2(id) {  //心形
//   let x1 = 6, y1 = 4, i = 1
//   let x2 = 6, y2 = 4
//   let x3 = 3, y3 = 2
//   let x4 = 9, y4 = 2
//   let x5 = 1, y5 = 5
//   let x6 = 11, y6 = 5;
//   (function fn() {
//     if (i <= 3) {
//       foodApplyXY(x1, y1, id)
//       foodApplyXY(x2, y2, id)
//     }
//     else if (i <= 6) {
//       foodApplyXY(x3, y3, id)
//       foodApplyXY(x4, y4, id)
//     }
//     else {
//       foodApplyXY(x5, y5, id)
//       foodApplyXY(x6, y6, id)
//     }
//     drawGame()
//     if (i < 12) setTimeout(fn, foodSpeed)
//     if (i <= 3) { x1--; y1--; x2++; y2-- }
//     else if (i <= 6) { x3--; y3++; x4++; y4++ }
//     else { x5++; y5++; x6--; y6++ }
//     i++
//   })();
// }

// function foodApply3(id) {  //上下
//   let x1 = 0, y1 = 0, i = 1
//   let x2 = 11, y2 = 1
//   let x3 = 1, y3 = 11
//   let x4 = 12, y4 = 12;
//   (function fn() {
//     foodApplyXY(x1, y1, id)
//     foodApplyXY(x2, y2, id)
//     foodApplyXY(x3, y3, id)
//     foodApplyXY(x4, y4, id)
//     drawGame()
//     if (i < 7) setTimeout(fn, foodSpeed)
//     x1 += 2; x2 -= 2
//     x3 += 2; x4 -= 2
//     i++
//   })();
// }

// function foodApply4(id) {  //五点
//   let x1 = 2, y1 = 2, i = 1;
//   (function fn() {
//     foodApplyXY(x1, y1, id)
//     foodApplyXY(x1 + 8, y1, id)
//     foodApplyXY(x1 + 8, y1 + 6, id)
//     foodApplyXY(x1, y1 + 6, id)
//     foodApplyXY(x1 + 4, y1 + 3, id)
//     drawGame()
//     if (i < 4) setTimeout(fn, foodSpeed)
//     if (i === 1) {
//       x1++; y1++
//     }
//     else if (i === 2) {
//       x1--; y1++
//     }
//     else if (i === 3) {
//       x1--; y1--
//     }
//     i++
//   })();
// }

function holeApply() { //洞口刷新
  if (firstHole) {
    firstHole = false
    holeExist = true
    hole = { x: 6, y: 6 }
  }
  else {
    holeExist = true
    let X, Y
    while (true) {
      let f = true
      X = myRandom(2, areaSize / cellSize - 2)
      Y = myRandom(2, areaSize / cellSize - 2)
      food.forEach(obj => {
        if (obj.x === X && obj.y === Y) f = false
      })
      snake.forEach(obj => {
        if (obj.x === X && obj.y === Y) f = false
      })
      if (X >= snake[0].x - 1 && X <= snake[0].x + 1 && Y >= snake[0].y - 1 && Y <= snake[0].y + 1) f = false
      if (f) break
    }
    hole = { x: X, y: Y }
  }
}

function GameOver() { //游戏结束
  gameOn = false
  gameOver = true
  drawGame()
  if (totalScore > maxScore) {
    maxScore = totalScore
    localStorage.setItem('maxScore', maxScore)
  }
  if (maxScore > 99999) {
    maxScoreText.innerHTML = Math.floor(maxScore / 100) / 100 + '万'
  }
  else maxScoreText.innerHTML = maxScore
  if (totalScore > 99999) {
    currentScoreText.innerHTML = Math.floor(totalScore / 100) / 100 + '万'
  }
  else currentScoreText.innerHTML = totalScore
  if (totalScore <= bound1) {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel1.png)'
  }
  else if (totalScore <= bound2) {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel2.png)'
  }
  else {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel3.png)'
  }
  let s = 900
  setTimeout(function () {
    gameOverPanelContainer.style.visibility = 'visible'
    gameOverPanel.animate(keyFrames3, timing2)
  }, s)
  setTimeout(function () {
    maxScoreText.style.visibility = 'visible'
    currentScoreText.style.visibility = 'visible'
  }, s + 250)
}

window.addEventListener('keydown', function (e) {  //键盘按下
  e.preventDefault();
  //空格键暂停
  if (e.key === ' ') {
    pauseButtonControl()
  }
  else if (pause) return

  switch (e.key) {
    case 'ArrowUp':
      dirToUp()
      break
    case 'ArrowDown':
      dirToDown()
      break
    case 'ArrowLeft':
      dirToLeft()
      break
    case 'ArrowRight':
      dirToRight()
      break
    case 's':
      if (!speedUp) {
        speedStart()
        break
      }
  }

  //初始状态：按方向键开始游戏
  //settle结束，方向键继续游戏
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    gameOnControl()
  }

  //死亡状态：按空格键回到初始状态
  if (gameOver && e.key === ' ' && gameOverPanelContainer.style.visibility === 'visible') {
    gameOver = false
    gameOverPanelContainer.style.visibility = 'hidden'
    init()
  }
})

window.addEventListener('keyup', function (e) {  //键盘松开
  e.preventDefault();
  if (e.key === 's') speedEnd()

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    dirControlButton.style.backgroundImage = 'url(./assets/keyboard_default.png)'
  }
})

function musicControl() {  //音量键控制
  if (pausePanel.style.visibility === 'visible') {
    if (musicIsOn) {
      musicIsOn = false
      pausePanel.style.backgroundImage = 'url(./assets/pause_musicOFF.png)'
    }
    else {
      musicIsOn = true
      pausePanel.style.backgroundImage = 'url(./assets/pause_musicON.png)'
    }
  }
}

musicON.addEventListener('click', function (e) {  //音量键(鼠标)
  e.preventDefault();
  musicControl()
})

musicON.addEventListener('touchstart', function (e) {  //音量键(触屏)
  e.preventDefault();
  musicControl()
})

function continueButtonControl() {  //'继续'按钮控制
  if (pausePanel.style.visibility === 'visible') {
    pause = false
    pauseButton.style.backgroundImage = 'url(./assets/pause_default.png)'
    pausePanel.style.visibility = 'hidden'
    startLoop()
  }
}

continueButton.addEventListener('click', function (e) {  //继续(鼠标)
  e.preventDefault();
  console.log(e.target);
  continueButtonControl()
})

continueButton.addEventListener('touchstart', function (e) {  //继续(触屏)
  e.preventDefault();
  continueButtonControl()
})

function againControl() {  //'再玩一次'按钮控制
  if (gameOver && gameOverPanelContainer.style.visibility === 'visible') {
    gameOver = false
    gameOverPanelContainer.style.visibility = 'hidden'
    init()
  }
}

again.addEventListener('touchstart', function (e) {  //再玩一次(触屏)
  e.preventDefault();
  againControl()
})

again.addEventListener('click', function (e) {  //再玩一次(鼠标)
  e.preventDefault();
  againControl()
})

function pauseButtonControl() {  //暂停键控制
  if (!gameOver) {
    if (pause) {
      pause = false
      pauseButton.style.backgroundImage = 'url(./assets/pause_default.png)'
      pausePanel.style.visibility = 'hidden'
      if (gameOn) startLoop()
    }
    else {
      pause = true
      pauseButton.style.backgroundImage = 'url(./assets/pause_hold.png)'
      drawGame()
      pausePanel.style.visibility = 'visible'
      pausePanel.animate(keyFrames2, timing2)
    }
  }
}

pauseButton.addEventListener('touchstart', function (e) {  //暂停键
  e.preventDefault();
  pauseButtonControl()
})

function speedStart() {  //加速开始
  if (!speedUp) {
    speedUp = true
    speedButton.style.backgroundImage = 'url(./assets/speed_hold.png)'
    moveSpeed = rushSpeed
  }
}

function speedEnd() {  //加速结束
  if (speedUp) {
    speedUp = false
    speedButton.style.backgroundImage = 'url(./assets/speed_default.png)'
    moveSpeed = defaultSpeed
  }
}

speedButton.addEventListener('touchstart', function (e) {  //加速键按住
  e.preventDefault();
  speedStart()
})

speedButton.addEventListener('touchend', function (e) {  //抬起：加速取消
  e.preventDefault();
  speedEnd()
})

key.addEventListener('touchend', function (e) {  //抬起：方向键取消
  e.preventDefault();
  dirControlButton.style.backgroundImage = 'url(./assets/keyboard_default.png)'
})

function dirToUp() {
  if (!gameOn || settle && !settling) {
    snake[0].dirX = 0
    snake[0].dirY = -1
  }
  else if (snake[0].dirX === 1 && snake[0].dirY === 0) {
    snake[0].dirX = -1
    snake[0].dirY = -1
  }
  else if (snake[0].dirX === -1 && snake[0].dirY === 0) {
    snake[0].dirX = 1
    snake[0].dirY = -1
  }
  dirControlButton.style.backgroundImage = 'url(./assets/up_hold.png)'
}

function dirToDown() {
  if (!gameOn || settle && !settling) {
    snake[0].dirX = 0
    snake[0].dirY = 1
  }
  else if (snake[0].dirX === 1 && snake[0].dirY === 0) {
    snake[0].dirX = -1
    snake[0].dirY = 1
  }
  else if (snake[0].dirX === -1 && snake[0].dirY === 0) {
    snake[0].dirX = 1
    snake[0].dirY = 1
  }
  dirControlButton.style.backgroundImage = 'url(./assets/down_hold.png)'
}

function dirToLeft() {
  if (!gameOn || settle && !settling) {
    snake[0].dirX = -1
    snake[0].dirY = 0
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === 1) {
    snake[0].dirX = -1
    snake[0].dirY = -1
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === -1) {
    snake[0].dirX = -1
    snake[0].dirY = 1
  }
  dirControlButton.style.backgroundImage = 'url(./assets/left_hold.png)'
}

function dirToRight() {
  if (!gameOn || settle && !settling) {
    snake[0].dirX = 1
    snake[0].dirY = 0
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === 1) {
    snake[0].dirX = 1
    snake[0].dirY = -1
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === -1) {
    snake[0].dirX = 1
    snake[0].dirY = 1
  }
  dirControlButton.style.backgroundImage = 'url(./assets/right_hold.png)'
}

function gameOnControl() {  //初始状态：按方向键开始游戏 //settle结束，方向键继续游戏
  if ((!gameOn || settle && !settling)) {
    gameOn = true
    settle = false
    startLoop()
  }
}

document.addEventListener('touchmove', function (e) {  //方向键按住拖动  
  e.preventDefault();
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top - 2)
    // console.log(parseInt(x) + ', ' + parseInt(y));
    if (x > -40 && y > -60 && x < dirControlWidth + 60 && y < dirControlWidth + 60) {
      if (x < y && x + y < dirControlWidth) {
        dirToLeft()
        gameOnControl()
      }
      else if (x > y && x + y < dirControlWidth) {
        dirToUp()
        gameOnControl()
      }
      else if (x > y && x + y > dirControlWidth) {
        dirToRight()
        gameOnControl()
      }
      else if (x < y && x + y > dirControlWidth) {
        dirToDown()
        gameOnControl()
      }
    }
  })
}, { passive: false })

document.addEventListener('touchstart', function (e) {  //方向键点击
  e.preventDefault();
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top - 2)
    // console.log(parseInt(x) + ', ' + parseInt(y));
    if (x > -40 && y > -60 && x < dirControlWidth + 60 && y < dirControlWidth + 60) {
      if (x < y && x + y < dirControlWidth) {
        dirToLeft()
        gameOnControl()
      }
      else if (x > y && x + y < dirControlWidth) {
        dirToUp()
        gameOnControl()
      }
      else if (x > y && x + y > dirControlWidth) {
        dirToRight()
        gameOnControl()
      }
      else if (x < y && x + y > dirControlWidth) {
        dirToDown()
        gameOnControl()
      }
    }
  })
}, { passive: false })