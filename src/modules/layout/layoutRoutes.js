import layoutState from './layoutState';

export default function layoutRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('layout', layoutState);

}