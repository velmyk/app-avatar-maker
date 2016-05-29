import BarChart from './BarChart';
import LineChart from './LineChart';
import Diagram from './Diagram';

export default class FootballController {
	constructor($window, d3, data, FootballDataResource) {
		'ngInject';

		this.FootballDataResource = FootballDataResource;
		this.d3 = d3;
		this.leagueData = data.standing;
		this.chart = new BarChart(this.d3, '.football-chart', 600, 400, 'position', 'goals');

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
		this.chart = new BarChart(this.d3, '.football-chart', 600, 400, 'position', 'goals');
		this.drawChart();
	}

	useLineChart() {
		this.chart.clearChart();
		this.chart = new LineChart(this.d3, '.football-chart', 600, 400, 'position', 'goals');
		this.drawChart();
	}

	useDiagram() {
		this.chart.clearChart();
		this.chart = new Diagram(this.d3, '.football-chart', 600, 400, 'goals');
		this.drawChart();
	}
}