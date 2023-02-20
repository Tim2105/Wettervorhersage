<script>
    import DayWeatherOverview from "/src/components/DayWeatherOverview.svelte";

    const day = 'Monday';
    const temperatures = [20, 23, 22, 21];
    const rainProbabilities = [50, 30, 70, 90];
    const cloudDensities = [10, 10, 10, 10];
    const windSpeeds = [15, 20, 10, 15];
</script>

<DayWeatherOverview
    day={day}
    temperatures={temperatures}
    rainProbabilities={rainProbabilities}
    cloudDensities={cloudDensities}
    windSpeeds={windSpeeds} />