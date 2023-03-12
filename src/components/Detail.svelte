<!-- Die Detail.svelte soll mit  chart js ein Diagramm den Temperaturverlauf des Tages zeichnen -->
<script>
	import chartjs from 'chart.js';
    import { afterUpdate } from 'svelte';
	let chartData;
	import { onMount } from 'svelte';

	let chartValues = [-20, 10, 5, 2, 20, 30, 45];
	let chartLabels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
	let ctx;
	let chartCanvas;

	onMount(async (promise) => {
		  ctx = chartCanvas.getContext('2d');
			var chart = new chartjs(ctx, {
				type: 'line',
				data: {
						labels: chartLabels,
						datasets: [{
								label: 'Revenue',
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(255, 99, 132)',
								data: chartValues
						}]
				}
		});

	});

</script>

<canvas bind:this={chartCanvas} id="myChart"></canvas>