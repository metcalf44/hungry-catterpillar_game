
const grid = document.querySelector(".grid")
const startBtn = document.getElementById("startBtn")
const scoreDisplay = document.getElementById("score")
let squares = []
let currentCaterpillar = [2,1,0]
let direction = 1
const width = 10
// the width var needs to be the same width as the boxes in the grid
let appleIndex = 0
let timerId = 0
let score = 0
let speed = 0.9
let intervalTime = 900


function createGrid() {

    for (let i = 0; i < 100; i++) {

    const square = document.createElement("div")
    square.classList.add("squares")
    grid.appendChild(square)
    squares.push(square)
    }
}

createGrid()

// the forEach allows the class of caterpillar to be added to each array inside the currentCaterpillar array
// the index part can be called anything

currentCaterpillar.forEach(index => squares[index].classList.add("caterpillar"))

function startGame() {
    clearInterval(timerId)
    currentCaterpillar.forEach(index => squares[index].classList.remove("caterpillar"))
    squares[appleIndex].classList.remove("apple")
    currentCaterpillar = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 900
    generateApple()
    currentCaterpillar.forEach(index => squares[index].classList.add("caterpillar"))
    timerId = setInterval(move, intervalTime)
    // the set interval has to have a function and the time is done in millisecs
    // to stop it use clearInterval(function name here)
}


    // the if below statement contains modulus check here https://www.w3schools.com/js/js_arithmetic.asp
// currentCaterpillar[0] is indicating the front of the caterpillar
// the const width has been used a lot its instead of using the number 10 then if we change the width
// above then there will be no need to change the modulus/

function move() {
    if (
        (currentCaterpillar[0] + width >= width * width && direction === width) ||
        (currentCaterpillar[0] % width === width -1 && direction === 1) ||
        (currentCaterpillar[0] % width === 0 && direction === -1) ||
        (currentCaterpillar[0] - width < 0 && direction === -width) ||
        squares[currentCaterpillar[0] + direction].classList.contains("caterpillar")
    )
    return clearInterval(timerId)

    const tail = currentCaterpillar.pop()
    squares[tail].classList.remove("caterpillar")
    currentCaterpillar.unshift(currentCaterpillar[0] + direction)

    if (squares[currentCaterpillar[0]].classList.contains("apple")){
        squares[currentCaterpillar[0]].classList.remove("apple")
        squares[tail].classList.add("caterpillar")
        currentCaterpillar.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score 
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
    squares[currentCaterpillar[0]].classList.add("caterpillar")
}

function generateApple() {
    do { 
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains("caterpillar"))
    squares[appleIndex].classList.add("apple")
}
generateApple()

// key codes allow you to use the keys to move on the screen.
// 37 = left, 38 = up, 39 = right, 40 = down
//  to use this you need to set a function and use event or E fot short.

function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 40) {
        direction = +width
    } else if (e.keycode === 13) {
        startGame()
    }
}

document.addEventListener("keydown", control)

startBtn.addEventListener("click", startGame)