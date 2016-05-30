export default class FootballController {
	constructor(data, FootballDataResource, ChartFactory) {
		'ngInject';

		this.leagueData = data.standing;
		this.FootballDataResource = FootballDataResource;
		this.ChartFactory = ChartFactory;
		this.chart = this.ChartFactory.barChart('.football-chart', 600, 400, 'position', 'goals');
		this.input = {
			leagueId: null
		};

		this.drawChart();
	}

	drawChart() {
		this.chart.updateChartData(this.leagueData);
	}

	onGetLeagueDataSubmit() {
		this.FootballDataResource.getLeagueData(this.input.leagueId)
			.then(leagueData => {
				this.leagueData = leagueData.standing;
				this.drawChart();
			});
	}

	useBarChart() {
		this.chart.clearChart();
		this.chart = this.ChartFactory.barChart('.football-chart', 600, 400, 'position', 'goals');
		this.drawChart();
	}

	useLineChart() {
		this.chart.clearChart();
		this.chart = this.ChartFactory.lineChart('.football-chart', 600, 400, 'position', 'goals');
		this.drawChart();
	}

	useDiagram() {
		this.chart.clearChart();
		this.chart = this.ChartFactory.diagram('.football-chart', 600, 400, 'goals');
		this.drawChart();
	}
}