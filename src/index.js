const h1 = document.createElement('h1')
const body = document.getElementById('body')
h1.innerText = 'Game Project WOOOOOO!'


const gameCanvas = document.createElement('canvas')
gameCanvas.id = 'canvas'
gameCanvas.height = '600'
gameCanvas.width = '900'

body.appendChild(h1)
body.appendChild(gameCanvas)

function draw() {
    const ctx = gameCanvas.getContext('2d')
    
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(10,10,50,50)
}

draw()