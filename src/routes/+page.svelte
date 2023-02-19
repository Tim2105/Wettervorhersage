<script>
    import DayWeatherOverview from "/src/components/DayWeatherOverview.svelte";

    const day = 'Monday';
    const temperatures = [20, 23, 22, 21];
    const rainProbabilities = [20, 30, 10, 5];
    const cloudDensities = [0, 10, 12, 16];
    const windSpeeds = [1, 2, 1, 3];
</script>

<DayWeatherOverview
    day={day}
    temperatures={temperatures}
    rainProbabilities={rainProbabilities}
    cloudDensities={cloudDensities}
    windSpeeds={windSpeeds} />