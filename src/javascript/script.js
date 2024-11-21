document.querySelector('#pesquisa').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value

    if (!cityName) {
        return alert('Digite uma cidade, por favor');
    }    
    const key = '08fcc00e3af42a7475dff475e7d21f47'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${key}&units=metric&lang=pt_br`

    const resultado = await fetch(url);
    const json = await resultado.json();

    if (json.cod === 200) {
        info ({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });


    }   else {
        showAlert('Não foi possível localizar')
    }

});

function info(json){
    showAlert('');

    document.querySelector("#clima").classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_description').innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>°C</sup>`;
    document.querySelector('#umidade').innerHTML = `${json.humidity}%`;
    document.querySelector('#vento').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
    
}

    console.log(urlImage)

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}