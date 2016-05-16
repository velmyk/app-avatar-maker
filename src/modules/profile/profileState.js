import profileTemplate from './profile.html';
import ProfileController from './ProfileController';

export default {
    url: '/',
	template: profileTemplate,
	controller: ProfileController,
	controllerAs: 'profileCtrl'
};