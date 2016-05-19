import angular from 'angular';

import FabricService from './FabricService';

export default angular.module('shared', [])
	.service('FabricService', FabricService)
    .name;