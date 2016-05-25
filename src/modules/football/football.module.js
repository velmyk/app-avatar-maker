import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './footballRoutes';

export default angular.module('app.football', [uirouter])
	.config(routes)
	.name;