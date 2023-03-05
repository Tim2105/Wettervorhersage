<!--
    Setzt aus einzelnen Wettericons ein Icon zusammen, dass die Wetterbedingungen darstellt.
    Schnee und Unwetter werden nicht dargestellt.

    Der Wettertyp setzt sich wie folgt zusammen:
    - (sunny | partly_cloudy | cloudy | clear_night | partly_cloudy_night)
    - (rainy)?
    - (windy)?

    @author Tim Plotzki
-->

<script>
    import { iconCombinations } from './IconCombinations.js';

    const icons = {
        cloud: '/icons/cloud.png',
        small_cloud: '/icons/small_cloud.png',
        sun: '/icons/sun.png',
        rain: '/icons/rain.png',
        moon: '/icons/moon.png',
        wind: '/icons/wind.png',
    };

    export let weatherType = 'sunny';

    $: showIcons = iconCombinations[weatherType];
</script>

<div class='iconContainer'>
    {#if showIcons.sun}
        <img src={icons['sun']} alt='sun' class='weatherIcon sunIcon'/>
    {/if}

    {#if showIcons.cloud}
        <img src={icons['cloud']} alt='cloud' class='weatherIcon cloudIcon'/>
    {/if}

    {#if showIcons.cloud_sun}
        <img src={icons['sun']} alt='cloud_sun' class='weatherIcon cloudSunIcon'/>
    {/if}

    {#if showIcons.rain}
        <img src={icons['rain']} alt='rain' class='weatherIcon rainIcon'/>
    {/if}

    {#if showIcons.small_cloud}
        <img src={icons['small_cloud']} alt='small_cloud' class='weatherIcon smallCloudIcon'/>
    {/if}

    {#if showIcons.moon}
        <img src={icons['moon']} alt='moon' class='weatherIcon moonIcon'/>
    {/if}

    {#if showIcons.cloud_moon}
        <img src={icons['moon']} alt='cloud_moon' class='weatherIcon cloudMoonIcon'/>
    {/if}

    {#if showIcons.wind}
        <img src={icons['wind']} alt='wind' class='weatherIcon windIcon'/>
    {/if}

    {#if showIcons.sunny_wind}
        <img src={icons['sun']} alt='sun' class='weatherIcon windySunIcon'/>
        <img src={icons['wind']} alt='wind' class='weatherIcon sunnyWindIcon'/>
    {/if}

    {#if showIcons.moon_wind}
        <img src={icons['moon']} alt='moon' class='weatherIcon windyMoonIcon'/>
        <img src={icons['wind']} alt='wind' class='weatherIcon moonWindIcon'/>
    {/if}
</div>

<style>
    .iconContainer {
        position: relative;
        top: 0px;
        width: 100px;
        margin-bottom: 90px;
    }

    .weatherIcon {
        position: absolute;
    }

    .sunIcon {
        margin-top: 0%;
        margin-left: 8%;
        width: 77%;
        z-index: 4;
    }

    .windySunIcon {
        margin-top: 0%;
        margin-left: 8%;
        width: 77%;
        z-index: 1;
    }

    .cloudIcon {
        margin-top: 2%;
        width: 100%;
        z-index: 4;
    }

    .cloudSunIcon {
        margin-top: 2%;
        margin-left: 52%;
        width: 45%;
        z-index: 3;
    }

    .rainIcon {
        margin-top: 56%;
        margin-left: 24%;
        width: 48%;
        z-index: 2;
    }

    .smallCloudIcon {
        margin-top: 8%;
        margin-left: 50%;
        width: 50%;
        z-index: 3;
    }

    .moonIcon {
        margin-top: 2%;
        margin-left: 14%;
        width: 65%;
        z-index: 4;
    }

    .cloudMoonIcon {
        margin-top: 0%;
        margin-left: 60%;
        width: 38%;
        z-index: 3;
    }

    .windyMoonIcon {
        margin-top: 2%;
        margin-left: 14%;
        width: 65%;
        z-index: 1;
    }

    .windIcon {
        margin-top: 50%;
        margin-left: 26%;
        width: 48%;
        z-index: 1;
    }

    .sunnyWindIcon {
        margin-top: 50%;
        margin-left: 25%;
        width: 42%;
        z-index: 2;
    }

    .moonWindIcon {
        margin-top: 50%;
        margin-left: 25%;
        width: 42%;
        z-index: 2;
    }
</style>