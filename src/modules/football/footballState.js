import footballTemplate from './football.html';
import FootballController from './FootballController';

export default {
    url: '/',
    views: {
    	'content@layout': {
    		template: footballTemplate,
			controller: FootballController,
			controllerAs: 'footballCtrl'
    	}
    }
};