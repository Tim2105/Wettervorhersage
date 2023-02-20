/**
 * @fileoverview Stellt eine API Anfrage mit der ungefähren Position des Nutzers an https://open-meteo.com diese gibt Jason Daten zurück
 * 
 *  -
 * 
 * @author  Nils Bachmann
 */

/**Aktuelle Lokation feststellen */
function ermittelPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(APIAbfrage);
        } else { 
            ausgabe.innerHTML = 'Ihr Browser unterstützt keine Geolocation.';
        }
    });
}

/**API Abfrage mit der Position des Nutzers */
function APIAbfrage(position)
{
    fetch ('https://api.open-meteo.com/v1/forecast?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude + '&hourly=temperature_2m,wind_speed,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code_da')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let temperatur = data.hourly.temperature_2m[0];
        let windgeschwindigkeit = data.hourly.wind_speed[0];
        let wettercode = data.hourly.weather_code[0];
        let wettercodeTag = data.daily.weather_code_da[0];
        let temperaturTagMax = data.daily.temperature_2m_max[0];
        let temperaturTagMin = data.daily.temperature_2m_min[0];
        let temperaturTag = (temperaturTagMax + temperaturTagMin) / 2;
        let wettercodeTag2 = data.daily.weather_code_da[1];
        let temperaturTagMax2 = data.daily.temperature_2m_max[1];
        let temperaturTagMin2 = data.daily.temperature_2m_min[1];
        let temperaturTag2 = (temperaturTagMax2 + temperaturTagMin2) / 2;
        let wettercodeTag3 = data.daily.weather_code_da[2];
        let temperaturTagMax3 = data.daily.temperature_2m_max[2];
        let temperaturTagMin3 = data.daily.temperature_2m_min[2];
        let temperaturTag3 = (temperaturTagMax3 + temperaturTagMin3) / 2;
        let wettercodeTag4 = data.daily.weather_code_da[3];
        let temperaturTagMax4 = data.daily.temperature_2m_max[3];
        let temperaturTagMin4 = data.daily.temperature_2m_min[3];
        let temperaturTag4 = (temperaturTagMax4 + temperaturTagMin4) / 2;
        let wettercodeTag5 = data.daily.weather_code_da[4];
        let temperaturTagMax5 = data.daily.temperature_2m_max[4];
        let temperaturTagMin5 = data.daily.temperature_2m_min[4];
        let temperaturTag5 = (temperaturTagMax5 + temperaturTagMin5) / 2;
        let wettercodeTag6 = data.daily.weather_code_da[5];
        let temperaturTagMax6 = data.daily.temperature_2m_max[5];
        let temperaturTagMin6 = data.daily.temperature_2m_min[5];
        let temperaturTag6 = (temperaturTagMax6 + temperaturTagMin6) / 2;
        let wettercodeTag7 = data.daily.weather_code_da[6];
        let temperaturTagMax7 = data.daily.temperature_2m_max[6];
        let temperaturTagMin7 = data.daily.temperature_2m_min[6];
        let temperaturTag7 = (temperaturTagMax7 + temperaturTagMin7) / 2;
        let wettercodeTag8 = data.daily.weather_code_da[7];
        let temperaturTagMax8 = data.daily.temperature_2m_max[7];
        let temperaturTagMin8 = data.daily.temperature_2m_min[7];
        let temperaturTag8 = (temperaturTagMax8 + temperaturTagMin8) / 2;
});
}

