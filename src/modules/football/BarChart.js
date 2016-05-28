export default class BarChart {
	constructor(d3, container, width, height, xValue, yValue) {
		this.xValue = xValue;
		this.yValue = yValue;

		this.margin = {
			top: 20,
			right: 20,
			bottom: 30,
			left: 40
		};

		this.d3 = d3;

		this.width = width - this.margin.left - this.margin.right;
		this.height = height - this.margin.top - this.margin.bottom;

		this.x = this.d3.scale.ordinal()
			.rangeRoundBands([0, this.width], .1);

		this.y = this.d3.scale.linear()
			.range([this.height, 0]);

		this.xAxis = this.d3.svg.axis()
    		.scale(this.x)
    		.orient('bottom');

    	this.yAxis = this.d3.svg.axis()
		    .scale(this.y)
			.orient('left')
			.ticks(10);

		this.chart = this.d3.select(container)
			.append('svg')
    			.attr('width', this.width + this.margin.left + this.margin.right)
    			.attr('height', this.height + this.margin.top + this.margin.bottom)
  				.append('g')
    				.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    	this.chart
			.append('g')
      			.attr('class', 'x axis')
      			.attr('transform', `translate(0, ${this.height})`)

		this.chart
			.append('g')
				.attr('class', 'y axis')
				.append('text')
					.attr('transform', 'rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('goals');

	}

	setScaling(data) {
		this.x.domain(data.map(d => d[this.xValue]));
		this.y.domain([0, d3.max(data, d => d[this.yValue])])
	}

	updateChartData(data) {

		this.setScaling(data);

		this.redrawAxis(data);

		let rect = this.chart.selectAll("rect")
			.data(data);

		rect.transition()
				.duration(1000)
					.attr("x", d => this.x(d[this.xValue]))
					.attr('width', this.x.rangeBand())
					.attr("y", d => this.y(d[this.yValue]))
					.attr("height", d => this.height - this.y(d[this.yValue]));

		rect.exit()
				.remove();

		rect.enter()
			.append('rect')
					.attr('class', 'bar')
					.attr('x', d => this.x(d[this.xValue]))
					.attr('width', this.x.rangeBand())
					.attr('y', d => this.y(d[this.yValue]))
					.attr('height', d => this.height - this.y(d[this.yValue]));
	}

	redrawAxis(data) {
		this.setScaling(data);

		this.chart
			.select('.y')
				.transition()
				.duration(1000)
					.call(this.yAxis);

		this.chart
			.select('.x')
				.transition()
				.duration(1000)
					.call(this.xAxis);
	}
}