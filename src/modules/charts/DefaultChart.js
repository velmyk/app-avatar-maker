export default class DefaultChart {
	constructor(d3, container) {
		this.d3 = d3;
		this.container = container;
	}

	redrawChart() {
		console.log('Drawing not implemented');
	}

	clearChart() {
		this.d3.selectAll(`${this.container} > *`).remove();
	}
}