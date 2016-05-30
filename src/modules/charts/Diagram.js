import DefaultChart from './DefaultChart';

export default class Diagram extends DefaultChart {
	constructor(d3, container, width, height, value) {

		super(d3, container);

		this.d3 = d3;
		this.value = value;
		this.container = container;
		this.width = width;
		this.height = height;
		this.radius = Math.min(this.width, this.height) / 2;
		this.color = d3.scale.category20c();

		this.partition = d3.layout.partition()
			.sort(null)
			.size([2 * Math.PI, this.radius * this.radius])
			.value(d => 1);

		this.arc = this.d3.svg.arc()
			.startAngle(d => d.x)
			.endAngle(d => d.x + d.dx)
			.innerRadius(d => Math.sqrt(d.y))
			.outerRadius(d => Math.sqrt(d.y + d.dy));

		this.d3.select(self.frameElement).style('height', this.height + 'px');

		this.initChart();
	}

	stash(d) {
		d.x0 = d.x;
		d.dx0 = d.dx;
	}

	arcTween(a) {
		let i = this.d3.interpolate({x: a.x0, dx: a.dx0}, a);
		return function(t) {
			var b = i(t);
			a.x0 = b.x;
			a.dx0 = b.dx;
			return this.arc(b);
		};
	}

	convertData(data) {
		let root = {};

		root.name = data.leagueCaption;

		root.children  = data.map(item => {
			var result = {};
			result.name = item.teamName;
			result.children = [
				{
					name: 'home',
					goals: item.home.goals
				},
				{
					name: 'away',
					goals: item.away.goals
				}
			];
			return result;
		});

		return root;
	}

	initChart() {
		this.diagram = d3.select(this.container)
			.append('svg')
				.attr('width', this.width)
				.attr('height', this.height)
				.append('g')
				.attr('transform', `translate(${this.width / 2}, ${this.height * .5})`);
	}

	updateChartData(data) {
		this.root = this.convertData(data);
		this.redrawChart();
	}

	redrawChart() {
		let diagram = this.diagram.datum(this.root).selectAll('path')
			.data(this.partition.value(d => d[this.value]).nodes);

		
		diagram.enter().append('path')
			.attr('display', d => d.depth ? null : 'none') // hide inner ring
			.attr('d', this.arc)
			.style('stroke', '#fff')
			.style('fill', d => this.color((d.children ? d : d.parent).name))
			.style('fill-rule', 'evenodd')
			.each(this.stash);

		diagram.transition()
			.duration(1000)
			.attr('d', this.arc);

		diagram.exit().remove();
	}
}