import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './footballRoutes';
import FootballDataResource from './FootballDataResource';

export default angular.module('app.football', [uirouter])
	.service('FootballDataResource', FootballDataResource)
	.config(routes)
	.name;