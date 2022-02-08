const searcBtn = document.querySelector('.search');
const inputWeather = document.querySelector('.ApplicationInput');
const main = document.querySelector('.main');
const btnL = document.querySelector('.left');
const btnR = document.querySelector('.right');
let offset = 0;

searcBtn.addEventListener('click',() => {
    getWeather();
})

inputWeather.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        getWeather();
    }
})

btnR.addEventListener('click', () => {
    offset = offset + 300
    main.style.right = offset + 'px'
})
btnL.addEventListener('click', () => {
    offset = offset - 300
    main.style.right = offset + 'px'
})

function getWeather() {
    const query = inputWeather.value
    inputWeather.value = ''
    fetch(`https://api.weatherapi.com/v1/current.json?key=b3d38b359d3e4c10ad2122202222801&q=${query}&aqi=no`)
    .then(response => response.json())
    .then(data => createCard(data, query))
}

function createCard(data, query) {
    var weatherCard = document.createElement('div'),
        weatherCardImg = document.createElement('img'),
        weatherCardTitle = document.createElement('h2'),
        weatherCardDescription = document.createElement('p')
        weatherCardCloseButton = document.createElement('button')

    weatherCard.classList.add("cardWeather")

    weatherCardImg.src = data.current.condition.icon
    weatherCardImg.classList.add("weather-img")

    weatherCardTitle.classList.add('city')
    weatherCardTitle.innerText = query

    weatherCardDescription.classList.add('temp')
    weatherCardDescription.innerText = data.current.temp_c + "°C"

    weatherCardCloseButton.classList.add('closeButton')
    weatherCardCloseButton.innerText = "✖"
    weatherCardCloseButton.addEventListener('click', () => {
        weatherCard.remove()
    })

    main.append(weatherCard)
    weatherCard.append(weatherCardCloseButton)
    weatherCard.append(weatherCardTitle)
    weatherCard.append(weatherCardImg)
    weatherCard.append(weatherCardDescription)
}
