import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './profileRoutes';

import AvatarService from './AvatarService';

export default angular.module('app.profile', [uirouter])
	.service('AvatarService', AvatarService)
	.config(routes)
	.name;