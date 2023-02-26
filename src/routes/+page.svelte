<script>
    import DayWeatherOverview from "/src/components/DayWeatherOverview.svelte";
    import { ermittlePosition, APIAbfrage } from "/src/components/APIrequest.js";
    import { onMount } from "svelte";

    let days = {};

    onMount(async () => {
        const position = await ermittlePosition();
        const weatherData = await APIAbfrage(position);
        
        for(let i = 0; i < weatherData.times.length; i++) {
            // 2023-02-25T00:00:00.000Z wird aus irgendeinem Grund zu 2023-02-24,
            // deshalb wird die Stunde um 1 erhöht
            const date = new Date(weatherData.times[i]);
            date.setHours(date.getHours() + 1);

            const day = date.toISOString().split('T')[0];

            if(days[day]) {
                days[day].temperatures.push(weatherData.temperatures[i]);
                days[day].rain.push(weatherData.rain[i]);
                days[day].cloudDensities.push(weatherData.cloudcover[i]);
                days[day].windSpeeds.push(weatherData.wind[i]);
            } else {
                days = {
                    ...days,
                    [day]: {
                        temperatures: [weatherData.temperatures[i]],
                        rain: [weatherData.rain[i]],
                        cloudDensities: [weatherData.cloudcover[i]],
                        windSpeeds: [weatherData.wind[i]]
                    }
                };
            }
        }
    });
</script>

<main class='WeatherOverviewContainer'>
    {#each Object.keys(days) as day}
        <div class='WeatherOverview'>
            <DayWeatherOverview
                day={new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}
                temperatures={days[day].temperatures}
                rain={days[day].rain}
                cloudDensities={days[day].cloudDensities}
                windSpeeds={days[day].windSpeeds}
            />
        </div>
    {/each}
</main>

<style>
    .WeatherOverview:first-child {
        width: 100%;
        margin: 0.5rem;
    }

    .WeatherOverview {
        margin: 0.25rem;
        width: max(300px, 16%)
    }

    .WeatherOverviewContainer {
        display: flex;
        flex-wrap: wrap;

        justify-content: center;
    }
</style>