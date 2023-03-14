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
        const chart1 = printChart(
            store.temperature,
            "Temperatur (°C)",
            "rgb(255, 99, 132)",
            "Temperatur"
        );
        const chart2 = printChart(
            store.rain,
            "Regen (Liter/m²)",
            "rgb(54, 162, 235)",
            "Regen"
        );
        const chart3 = printChart(
            store.wind,
            "Wind (km/h)",
            "rgb(255, 205, 86)",
            "Wind"
        );

        const avgChartWdith = (chart1.width + chart2.width + chart3.width) / 3;

        const title = document.querySelector(".title");

        title.style = `width: ${avgChartWdith}px;`;
    });

    function printChart(array, chartname, colour, chartid) {
        console.log(store.temperature);
        ctx = chartCanvas.getContext("2d");
        return new chartjs(document.getElementById(chartid), {
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
                responsive: false,
            },
        });
    }
</script>

<div class="container">
    <h1 class="title">Wetterdaten für { store.day }</h1>

    <div class="Charts">
        <div class="chartBox">
            <canvas id="Temperatur" />
        </div>
        <div class="chartBox">
            <canvas id="Regen" />
        </div>
        <div class="chartBox">
            <canvas id="Wind" />
        </div>
    </div>
</div>

<canvas bind:this={chartCanvas} id="chart" />

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
    }

    .title {
        text-align: center;
        border-radius: 0.5rem;
        background-color: #ccc;

        padding: 0.5rem;

        color: black;
    }

    .Charts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .chartBox {
        border-radius: 0.5rem;

        background-color: #ccc;
        
        margin: 0.5rem;

        padding: 0.5rem;

        width: fit-content;
        height: fit-content;

        align-self: center;

        box-shadow: 3px 3px 3px black;
    }

    .chartBox:hover {
        background-color: #eee;
        transition: background-color 0.3s ease;

        box-shadow: 3px 3px 3px #ddd;
        transition: box-shadow 0.3s ease;
    }

    canvas {
        width: 750px;
        height: 750px;
    }
</style>
