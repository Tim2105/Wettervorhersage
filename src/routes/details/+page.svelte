<!-- Die Detail.svelte soll mit  chart js ein Diagramm den Temperaturverlauf des Tages zeichnen  -->
<div class="Charts">
<span class="chartBox">
    <canvas id='Temperatur'></canvas>
</span>
<span class="chartBox">
    <canvas id='Regen'></canvas>
</span>
<span class="chartBox">
    <canvas id='Wind'></canvas>
</span>
</div>
<script>

	import chartjs from 'chart.js/auto';
    import store from '/src/stores/store.js';
	import { onMount } from 'svelte';


	const chartLabels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
        printChart(store.temperature, 'Temperatur');
        printChart(store.rain, 'Regen');
        printChart(store.wind, 'Wind');
		
    });

    function printChart(array , chartname) {
        console.log(store.temperature);
        ctx = chartCanvas.getContext('2d');
			var rain = new chartjs(document.getElementById(chartname), {
				type: 'line',
				data: {
						labels: chartLabels,
						datasets: [{
								label: chartname,
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: array
						}]
                
				},options: {
                    responsive: false
                }
		});
    }
</script>

<canvas bind:this={chartCanvas} id="chart"></canvas> 

<style>
    .Charts {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .chartBox {
        width: 30%;
        height: 30%;
    }
</style>
