<script>
    import chartjs from "chart.js/auto";
    import store from "/src/stores/store.js";
    import { onMount } from "svelte";

    const chartLabels = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23,
    ];
    let ctx;
    let chartCanvas;

    onMount(async (promise) => {
        printChart(
            store.temperature,
            "Temperatur",
            "rgb(255, 99, 132)",
            "Temperatur",
            "Stunden"
        );
        printChart(
            store.rain,
            "Regen",
            "rgb(54, 162, 235)",
            "Regenmenge",
            "Stunden"
        );
        printChart(
            store.wind,
            "Wind",
            "rgb(255, 205, 86)",
            "Windstärke",
            "Stunden"
        );
    });

    function printChart(array, chartname, colour, yAchse, xAchse) {
        console.log(store.temperature);
        ctx = chartCanvas.getContext("2d");
        //ctx.canvas.width = 300;
        //ctx.canvas.height = 300;
        var rain = new chartjs(document.getElementById(chartname), {
            type: "line",
            data: {
                labels: chartLabels,
                datasets: [
                    {
                        label: chartname,
                        fill: true,
                        backgroundColor: colour,
                        borderColor: "rgb(0,0,0)",
                        data: array,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        display: true,
                        text: yAchse,
                    },
                    x: {
                        display: true,
                        text: xAchse,
                    },
                },
                responsive: false,
            },
        });
    }
</script>

<div class="Charts">
    <span class="chartBox">
        <canvas id="Temperatur" />
    </span>
    <span class="chartBox">
        <canvas id="Regen" />
    </span>
    <span class="chartBox">
        <canvas id="Wind" />
    </span>
</div>

<canvas bind:this={chartCanvas} id="chart" />

<style>
    .Charts {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    canvas {
        width: 750px;
        height: 750px;
    }
</style>
