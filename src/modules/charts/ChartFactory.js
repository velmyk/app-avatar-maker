import BarChart from './BarChart';
import LineChart from './LineChart';
import Diagram from './Diagram';

export default class ChartFactory {
	constructor(d3) {
		'ngInject';

		this.d3 = d3;
	}

	barChart(container, width, height, xValue, yValue) {
		console.log(this);
		return new BarChart(this.d3, container, width, height, xValue, yValue);
	}

	lineChart(container, width, height, xValue, yValue) {
		return new LineChart(this.d3, container, width, height, xValue, yValue);
	}

	diagram(container, width, height, value) {
		return new Diagram(this.d3, container, width, height, value);
	}
};