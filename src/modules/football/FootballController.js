import BarChart from './BarChart';

export default class FootballController {
	constructor($window, d3, data, FootballDataResource) {
		'ngInject';

		this.FootballDataResource = FootballDataResource;

		this.leagueData = data.standing;
		this.barChart = new BarChart(d3, '.football-chart', 600, 400);

		this.input = {
			leagueId: null
		};

		this.drawBarChart();
	}

	drawBarChart() {
		this.barChart.updateChartData(this.leagueData, 'position', 'goals');
	}

	onGetLeagueDataSubmit() {
		// console.log(this.input.leagueId);
		this.FootballDataResource.getLeagueData(this.input.leagueId)
			.then(leagueData => this.barChart.redrawChart(leagueData.standing, 'position', 'goals'));
	}
}