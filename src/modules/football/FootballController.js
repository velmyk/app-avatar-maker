export default class FootballController {
	constructor($window, d3) {
		'ngInject';

		this.dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

        this.svg = d3.select('#chart');

        this.svg.selectAll("rect")
		   	.data(this.dataset)
		   	.enter()
		   	.append("rect")
			   	.attr("fill", (d) => `rgb(0, 0, ${d * 10})`)
			   	.attr("x", (d, i) => i * (600 / this.dataset.length))
			   	.attr("y", d => 400 - d * 4)
			   	.attr("width", 600 / this.dataset.length - 1)
			   	.attr("height", d => d * 4);

		this.svg.selectAll("text")
			.data(this.dataset)
				.enter()
				.append("text")
				.text(d => d)
					.attr("text-anchor", "middle")
					.attr("x", (d, i) => i * (600 / this.dataset.length) + (600 / this.dataset.length - 1) / 2)
					.attr("y", d => 400 - (d * 4) + 13)
					.attr("font-family", "sans-serif")
					.attr("font-size", "11px")
					.attr("fill", "white");
	}	
}