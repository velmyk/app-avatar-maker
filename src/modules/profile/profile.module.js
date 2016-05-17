import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './profileRoutes';

import './profile.scss';

export default angular.module('app.profile', [uirouter])
	.config(routes)
	.name;