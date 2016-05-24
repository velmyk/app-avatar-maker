import ProfileController from './ProfileController';
import AVATAR_ELEMENTS from './AVATAR_ELEMENTS';

describe('app::profile: ProfileController', () => {
	let sut,
		AvatarService;

	beforeEach(() => {
		AvatarService = {
			createCanvas: env.stub(),
			clearCanvas: env.stub(),
			displayElements: env.stub(),
			createImageElement: env.stub(),
			createEyes: env.stub(),
			createPathElement: env.stub(),
			saveAvatar: env.stub(),
			blinkElement: env.stub()
		};

		AvatarService.createImageElement.returns({
			then: env.stub()
		});

		sut = new ProfileController(AvatarService);
	});

	describe('on initialize', () => {
		beforeEach(() => {
			sut.addFace = env.stub();
			sut.drawEyes = env.stub();
			sut.initialize();
		});

		it('should create canvas for avatar', () => {
			AvatarService.createCanvas.should.calledWith('avatar');
		});

		it('should add default face to avatar', () => {
			sut.addFace.should.calledWith('default');
		});

		it('should add eyes to avatar', () => {
			sut.drawEyes.should.called;
		});
	});
});