const searcBtn = document.querySelector('.search');
const inputWeather = document.querySelector('.ApplicationInput');
const main = document.querySelector('.main');

searcBtn.addEventListener('click',() => {
    getWeather();
})

inputWeather.addEventListener('keydown', (e) => {
    if(e.keyCode == 13){
        getWeather();
    }
})

function getWeather() {
    const query = inputWeather.value
    inputWeather.value = ''
    fetch(`http://api.weatherapi.com/v1/current.json?key=b3d38b359d3e4c10ad2122202222801&q=${query}&aqi=no`)
    .then(response => response.json())
    .then(data => createCard(data, query))
}

function createCard(data, query) {
    let weatherCard = document.createElement('div'),
        weatherCardImg = document.createElement('img'),
        weatherCardTitle = document.createElement('h2'),
        weatherCardDescription = document.createElement('p')
        weatherCardCloseButton = document.createElement('button')

    weatherCard.classList.add("cardWeather")

    weatherCardImg.src = data.current.condition.icon

    weatherCardTitle.classList.add('city')
    weatherCardTitle.innerText = query

    weatherCardDescription.classList.add('temp')
    weatherCardDescription.innerText = data.current.temp_c

    weatherCardCloseButton.classList.add('closeButton')
    weatherCardCloseButton.innerText = "✖"

    main.append(weatherCard)
    weatherCard.append(weatherCardCloseButton)
    weatherCard.append(weatherCardImg)
    weatherCard.append(weatherCardTitle)
    weatherCard.append(weatherCardDescription)
}