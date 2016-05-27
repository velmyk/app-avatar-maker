import BarChart from './BarChart';

export default class FootballController {
	constructor($window, d3, data) {
		'ngInject';

		this.leagueData = data.standing;
		this.barChart = new BarChart(d3, '.football-chart', 600, 400);

		this.drawBarChart();
	}

	drawBarChart() {
		this.barChart.updateChartData(this.leagueData, 'position', 'goals');
	}	
}