const API = 'https://iot-domiburguer.herokuapp.com/api/IOT/DOMIBURGER/FREIDORA/thermometer'

const section_parrafo = document.getElementById('section_parrafo')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const time_long = 1000

drawGrid()

async function temperature(api) {
    const res = await fetch(api)
    const data = await res.json()

    if (res.status !== 200) {
        console.error('error ', res.status)
    } else {
        return data
    }

}

const drawTemperature = async () => {
    setInterval(async () => {
        const tem = await temperature(API)
        const date = new Date()
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
        section_parrafo.innerHTML += `<p>tem: ${tem} time: ${hour}:${minutes}:${seconds}</p>`
        console.log('k', tem)
    }, time_long)
}

function timeApp() {
    const date = new Date()
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
    return [hour, minutes, seconds]
}
function drawLine(x_i, y_i, x_f, y_f, color = '#A6A6A6') {
    ctx.lineWidth = 1
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x_i, y_i)
    ctx.lineTo(x_f, y_f)
    ctx.stroke()
}

function drawGrid() {
    const height = canvas.height
    const width = canvas.width
    const density = 10
    for (let i = 0; i < Math.floor(height / density) + 1; i++) {
        drawLine(0, i * density, width, i * density )
    }
    for (let i = 0; i < Math.floor(width / density) + 1; i++) {
        drawLine( i * density, 0, i * density, height  )
    }
}

