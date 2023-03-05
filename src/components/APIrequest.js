/**
 * @fileoverview Stellt eine API Anfrage mit der ungefähren Position des Nutzers an https://open-meteo.com diese gibt Jason Daten zurück
 * 
 *  -
 * 
 * @author  Nils Bachmann
 */

/**Aktuelle Lokation feststellen */
export async function ermittlePosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

/**API Abfrage mit der Position des Nutzers */
export async function APIAbfrage(position)
{
    const promise = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude + '&hourly=temperature_2m,rain,cloudcover,windspeed_10m');

    const data = await promise.json();

    if(data.error) {
        console.log(data.reason);
        return;
    }

    const times = data.hourly.time;
    const temperatures = data.hourly.temperature_2m;
    const rain = data.hourly.rain;
    const cloudcover = data.hourly.cloudcover;
    const wind = data.hourly.windspeed_10m;

    const weather = {
        times: times,
        temperatures: temperatures,
        rain: rain,
        cloudcover: cloudcover,
        wind: wind
    };

    return weather;
}