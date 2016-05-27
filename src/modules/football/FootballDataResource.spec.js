import FootballDataResource from './FootballDataResource';

describe('app::football: FootballDataResource', () => {
	let
		sut,
		$http;

	let
		result,
		responseData,
		successCb;

	beforeEach(() => {
		$http = {
			get: env.stub()
		};

		sut = new FootballDataResource($http);

		successCb = env.stub();
	});

	describe('get league data', () => {
		let
			leagueId,
			response;

		beforeEach(() => {
			leagueId = {};
			responseData = {};
			response = {
				data: responseData
			};
			$http.get.resolves(response);
			sut.getLeagueData(leagueId)
				.then(successCb);
		});

		it('should get league data from server', () => {
			$http.get.should.calledWith(`http://api.football-data.org/v1/soccerseasons/${leagueId}/leagueTable`);
		});

		// TODO - test promise

		// it('should return league data', () => {
		// 	successCb.should.calledWith(responseData);
		// });
	});
});