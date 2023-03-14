<!--
    Stellt anhand einer Liste von Wetterdaten für einen Tag eine Übersicht dar.

    Die Wetterdaten die angezeigt werden, sind:
    - Temperatur
    - Niederschlagswahrscheinlichkeit
    - Bewölkung
    - Windgeschwindigkeit

    Optional kann ein Hintergrundbild übergeben werden.

    @author Tim Plotzki
-->

<script>
    import { afterUpdate } from 'svelte';
    import WeatherIcon from '/src/components/WeatherIcon.svelte';
    import store from '/src/stores/store.js';
    import { goto } from '$app/navigation';

    export let day;
    export let temperatures;
    export let rain;
    export let cloudDensities;
    export let windSpeeds;
    export let backgroundImage = null;

    $: minTemp = Math.min(...temperatures);
    $: maxTemp = Math.max(...temperatures);
    $: avgTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length);

    $: maxRain = Math.max(...rain);

    $: avgCloudDensity = Math.round(cloudDensities.reduce((a, b) => a + b, 0) / cloudDensities.length);

    $: avgWindSpeed = Math.round(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length);

    let weatherType;

    afterUpdate(() => {
        weatherType = calcWeatherType();

        if(backgroundImage)
            document.querySelector('.container').style.backgroundImage = `${backgroundImage}`;
    });
    
    function calcWeatherType() {
        let result = '';

        if(avgCloudDensity < 15)
            result += 'sunny ';
        else if(avgCloudDensity < 60)
            result += 'partly_cloudy ';
        else
            result += 'cloudy ';
        
        if(maxRain > 50 && avgCloudDensity >= 15)
            result += 'rainy ';

        if(avgWindSpeed > 15)
            result += 'windy ';

        return result.trim();
    }

    function showDetails() {
        writeToStore();
        goto("/details/")
    }

    function writeToStore() {
        store.temperature = temperatures;
        store.rain = rain;
        store.cloudcover = cloudDensities;
        store.wind = windSpeeds;
        store.day = day;
    }

</script>

<div class='container' on:click={showDetails} on:keydown={showDetails}>
    <h1 class='headline'>{day}</h1>

    <WeatherIcon weatherType={weatherType} />

    <p class='avgTemp'>
        <span class='avgThermometer'>🌡</span>
        {avgTemp}°C
    </p>

    <p class='minMaxTemp'>
        <span class='maxTemp'>
            {maxTemp}°C
        </span>
            /
        <span class='minTemp'>
            {minTemp}°C
        </span>
    </p>

    <p class='rainCloudWindDetails'>
        <span class='rain' title='Regenintensität in Liter pro Quadratmeter und Stunde'>
            <span>🌧</span>
            {maxRain}
        </span>

        <span class='cloudDensity' title='Wolkendichte in Prozent'>
            <span>☁</span>
            {avgCloudDensity}
        </span>

        <span class='windSpeed' title='Windgeschwindigkeit in Meter pro Sekunde'>
            <span>💨</span>
            {avgWindSpeed}
        </span>
    </p>
</div>


<style>
    .container {
        display: inline-flex;
        flex-direction: column;
        align-items: center;

        width: 100%;

        padding-top: 1.5rem;
        padding-bottom: 0.5rem;

        border-radius: 0.5rem;

        background-color: #ccc;

        box-shadow: 3px 3px 3px black;

        font-family: 'Times New Roman', Times, serif;
    }

    .container:hover {
        box-shadow: 3px 3px 3px #fff;
        transition: box-shadow 0.3s ease;

        cursor: pointer;

        background-color: #eee;
        transition: background-color 0.3s ease;
    }

    .headline {
        font-size: 200%;
        font-weight: 600;
        margin: 0;
        margin-bottom: 1rem;
    }

    .avgThermometer {
        margin-right: 0.25rem;
    }

    .avgTemp {
        font-size: 2rem;
        font-weight: 600;
        margin: 0;
        margin-top: 0.5rem;
    }

    .minMaxTemp {
        font-size: 1rem;
        font-weight: 550;
        margin: 0;
        margin-bottom: 1.5rem;

        display: flex;
        align-items: center;

        font-style: italic;
    }

    .minTemp {
        margin: 0;
        margin-left: 0.5rem;
    }

    .maxTemp {
        margin: 0;
        margin-right: 0.5rem;
    }

    .rainCloudWindDetails {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        margin-bottom: .75rem;

        display: flex;
        align-items: center;
    }

    .rain {
        margin-left: 0.35rem;
        margin-right: 0.35rem;
    }

    .cloudDensity {
        margin-left: 0.35rem;
        margin-right: 0.35rem;
    }

    .windSpeed {
        margin-left: 0.35rem;
        margin-right: 0.35rem;
    }
</style>