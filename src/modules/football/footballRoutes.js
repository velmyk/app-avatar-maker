import footballState from './footballState';

export default function footballRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('layout.football', footballState);

}