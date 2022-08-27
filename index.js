const API = 'https://iot-domiburguer.herokuapp.com/api/IOT/DOMIBURGER/FREIDORA/thermometer'
const section_parrafo = document.getElementById('section_parrafo')
const time_long = 1000

async function temperature(api) {
    const res = await fetch(api)
    const data = await res.json()

    if (res.status !== 200) {
        console.log('erre ', res.status)
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

drawTemperature()
