import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './layoutRoutes';

export default angular.module('app.layout', [uirouter])
	.config(routes)
	.name;