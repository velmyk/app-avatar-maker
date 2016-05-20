import angular from 'angular';
import uirouter from 'angular-ui-router';

import modules from '../modules/modules';
import router from './router';

import '../scss/core.scss';

angular.module('app', [
        ...modules,
        uirouter
    ])
    .config(router);
