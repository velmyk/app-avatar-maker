import angular from 'angular';

import ChartFactory from './ChartFactory';

export default angular.module('app.charts', [])
	.service('ChartFactory', ChartFactory)
	.name;