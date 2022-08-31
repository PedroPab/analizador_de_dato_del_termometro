const API = 'https://iot-domiburguer.herokuapp.com/api/IOT/DOMIBURGER/FREIDORA/thermometer'
const density_unity = 10
const section_parrafo = document.getElementById('section_parrafo')
const time_input = 1001

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

//canvas.height = density_unity * 1000 //para que hayan 100 cuadriculas

const time_long = time_input
const list_point = []
const list_time = []

drawGrid()

document.addEventListener('click', (element) => {
    console.log(element)
    console.log(`${element.x}, ${element.y}`)
})

async function temperature(api) {
    const res = await fetch(api)
    const data = await res.json()

    if (res.status !== 200) {
        console.error('error ', res.status)
    } else {
        return data
    }

}

const temperaturePonit = async () => {
    setInterval(async () => {
        const tem = await temperature(API)
        list_point.push(tem)
        list_time.push(timeApp())
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawGrid()
        const point = await drawPoints(list_point, list_time)


    }, time_long)
}

temperaturePonit()


const drawTemperature = async () => {
    setInterval(async () => {
        const tem = await temperature(API)
        const date = new Date()
        const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
        section_parrafo.innerHTML += `<p>tem: ${tem} time: ${hour}:${minutes}:${seconds}</p>`
    }, time_long)
}

function timeApp() {
    const date = new Date()
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
    return [hour, minutes, seconds]
}
function drawLine(x_i, y_i, x_f, y_f, color = '#101101', grosor = 1) {
    ctx.lineWidth = grosor
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(x_i, y_i)
    ctx.lineTo(x_f, y_f)
    ctx.stroke()
}

function drawGrid() {
    const height = canvas.height
    const width = canvas.width
    const density = density_unity
    for (let i = 0; i < Math.floor(height / density) + 1; i++) {
        if (i % 10 == 0) {
            drawLine(0, i * density, width, i * density, 'black')
            drawText(0, i * density, `${canvas.height / density - i}°`)
        } else {
            drawLine(0, i * density, width, i * density, '#A6A6A6')
        }
        if (i == canvas.height / density - 180) drawLine(0, i * density, width, i * density, 'red', 5)
        if (i == canvas.height / density - 165) drawLine(0, i * density, width, i * density, 'green', 5)
    }
    for (let i = 0; i < Math.floor(width / density) + 1; i++) {
        drawLine(i * density, 0, i * density, height, '#A6A6A6')
    }


}

function drawPoint(x, y, color = 'red') {
    drawLine(x + 2, y + 2, x - 2, y - 2, color, 5)
}
async function drawPoints(list_tem, list_time) {
    if (list_tem.length > canvas.width / density_unity - 20) {
        while (list_tem.length > canvas.width / density_unity - 20) {
            list_tem.shift()
            list_time.shift()
        }
    }
    list_tem.map((element, index, arrary) => {


        //cada x segundos se dibuja una linea para mostrar el tiempo
        if (list_time[index][2] % 30 == 0) {
            drawLine(index * density_unity, 0, index * density_unity, canvas.height, '#365')
            drawText(index * density_unity, canvas.height - 20, `${list_time[index][0]}:${list_time[index][1]}:${list_time[index][2]}`)
            drawText(index * density_unity, 20, `${list_time[index][0]}:${list_time[index][1]}:${list_time[index][2]}`)
        }
        if (index == arrary.length - 1) {
            if (element > arrary[index - 1]) {
                drawPoint(index * density_unity, canvas.height - element * 10, "green")
            }
            drawText(index * density_unity, canvas.height - element * 10, `${element}°`)
            //return [list_tem, list_time]

        }

        drawPoint(index * density_unity, canvas.height - element * 10)

    })
    return [list_tem, list_time]

}

function drawText(x, y, text) {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.font = '20px arial';
    ctx.fillText(text, x, y);
}
