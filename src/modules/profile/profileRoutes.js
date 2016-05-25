import profileState from './profileState';

export default function profileRoutes($stateProvider) {
    'ngInject';

    $stateProvider
        .state('layout.profile', profileState);

}