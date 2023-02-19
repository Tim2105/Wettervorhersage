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

    export let day;
    export let temperatures;
    export let rainProbabilities;
    export let cloudDensities;
    export let windSpeeds;
    export let backgroundImage = null;

    $: minTemp = Math.min(...temperatures);
    $: maxTemp = Math.max(...temperatures);
    $: avgTemp = Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length);

    $: avgRainProbability = Math.round(rainProbabilities.reduce((a, b) => a + b, 0) / rainProbabilities.length);

    $: avgCloudDensity = Math.round(cloudDensities.reduce((a, b) => a + b, 0) / cloudDensities.length);

    $: avgWindSpeed = Math.round(windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length);

    let weatherType;

    afterUpdate(() => {
        let avgTempColor = calcTempColor(avgTemp);

        let avgThermometer = document.querySelector('.avgThermometer');

        avgThermometer.style.color = avgTempColor;

        weatherType = calcWeatherType();

        if(backgroundImage)
            document.querySelector('.container').style.backgroundImage = `url(${backgroundImage})`;
    });
    
    function calcWeatherType() {
        let result = '';

        if(avgCloudDensity < 10)
            result += 'sunny ';
        else if(avgCloudDensity < 40)
            result += 'partly_cloudy ';
        else
            result += 'cloudy ';
        
        if(avgRainProbability > 50 && avgCloudDensity >= 10)
            result += 'rainy ';

        if(avgWindSpeed > 10)
            result += 'windy ';

        return result.trim();
    }

    function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    }

    function rgbToHex(rgb) {
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];

        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function calcTempColor(temp) {
        let hot = 30;
        let warm = 20;
        let mild = 10;
        let cold = 0;

        let hotColor = '#ff0000';
        let warmColor = '#ffff00';
        let mildColor = '#08f26e';
        let coldColor = '#0000ff';

        if(temp >= hot)
            return hotColor;
        else if(temp >= warm)
            return interpolateColor(warmColor, hotColor, (temp - warm) / (hot - warm));
        else if(temp >= mild)
            return interpolateColor(mildColor, warmColor, (temp - mild) / (warm - mild));
        else if(temp >= cold)
            return interpolateColor(coldColor, mildColor, (temp - cold) / (mild - cold));
        else
            return coldColor;
    }

    function interpolateColor(color1, color2, factor) {
        let [r1, g1, b1] = hexToRgb(color1);
        let [r2, g2, b2] = hexToRgb(color2);

        let r = Math.round(r1 + factor * (r2 - r1));
        let g = Math.round(g1 + factor * (g2 - g1));
        let b = Math.round(b1 + factor * (b2 - b1));

        return rgbToHex([r, g, b]);
    }
</script>

<span class='container'>
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
        <span class='rain' title='Regenwahrscheinlichkeit'>
            <span>🌧</span>
            {avgRainProbability}%
        </span>

        <span class='cloudDensity' title='Wolkendichte'>
            <span>☁</span>
            {avgCloudDensity}%
        </span>

        <span class='windSpeed' title='Windgeschwindigkeit'>
            <span>💨</span>
            {avgWindSpeed}km/h
        </span>
    </p>

    <button class='btnDetails'>
        Details
    </button>
</span>


<style>
    .container {
        display: inline-flex;
        flex-direction: column;
        align-items: center;

        padding-top: 1.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        padding-bottom: 0.5rem;
        border-style: solid;
        border-width: 0.1rem;
        border-color: #000000;
        border-radius: 0.5rem;

        background-color: lightblue;

        font-family: 'Times New Roman', Times, serif;
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

    .btnDetails {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        margin-top: 1rem;
        padding: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-style: solid;
        border-width: 0.1rem;
        border-color: #000000;
        border-radius: 0.5rem;
        background-color: lightblue;
        cursor: pointer;
    }

    .btnDetails:hover {
        background-color: darkblue;
        color: lightblue;
    }
</style>