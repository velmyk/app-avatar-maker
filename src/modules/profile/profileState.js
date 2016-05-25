import profileTemplate from './profile.html';
import ProfileController from './ProfileController';

export default {
    url: '/profile',
    views: {
    	'content@layout': {
    		template: profileTemplate,
			controller: ProfileController,
			controllerAs: 'profileCtrl'
    	}
    }
};