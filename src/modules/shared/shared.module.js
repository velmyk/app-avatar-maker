import angular from 'angular';
import d3 from 'd3';

import FabricService from './FabricService';

export default angular.module('shared', [])
	.service('FabricService', FabricService)
	.constant('d3', d3)
    .name;