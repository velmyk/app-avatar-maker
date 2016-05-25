import layoutTemplate from './layout.html';
import headerTemplate from './header.html';

export default {
    url: '',
    abstract: true,
    views: {
    	'': {
    		template: layoutTemplate
    	},
    	'header@layout': {
    		template: headerTemplate
    	}
    }
};