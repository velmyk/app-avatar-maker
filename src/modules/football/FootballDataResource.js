export default class FootballDataResource {
	constructor($http) {
		'ngInject';

		this.$http = $http;
	}

	getLeagueData(leagueId) {
		return this.$http.get(`http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`, {
			headers: {
				'X-Auth-Token': '506fded9507f4d35a31fae98edad9e02'
			}
		})
			.then(response => response.data);
	}
}