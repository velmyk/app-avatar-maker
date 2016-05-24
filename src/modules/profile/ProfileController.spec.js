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
			sut.addEyes = env.stub();
			sut.initialize();
		});

		it('should create canvas for avatar', () => {
			AvatarService.createCanvas.should.calledWith('avatar');
		});

		it('should add default face to avatar', () => {
			sut.addFace.should.calledWith('default');
		});

		it('should add eyes to avatar', () => {
			sut.addEyes.should.called;
		});
	});

	describe('refresh avatar', () => {
		let
			canvas,
			avatar;

		beforeEach(() => {
			sut.avatarCanvas = canvas;
			sut.avatar = avatar;
			sut.refreshAvatar()
		});

		it('should clean canvas', () => {
			AvatarService.clearCanvas.should.calledWith(canvas);
		});

		it('should display all element on canvas', () => {
			AvatarService.displayElements.should.calledWith(canvas, avatar);
		});
	});

	describe('add face', () => {
		let
			faceType;

		beforeEach(() => {
			faceType = {};
			sut.addFace(faceType);
		});

		it('should create face element', () => {
			AvatarService.createImageElement.should.calledWith(AVATAR_ELEMENTS.face[faceType]);
		});

		// TODO: test promise

	});

	describe('add eyes', () => {
		let
			eyesElement;

		beforeEach(() => {
			eyesElement = {};
			AvatarService.createEyes.withArgs(AVATAR_ELEMENTS.eyes).returns(eyesElement);
			sut.addEyes();
		});

		it('should create eyes element', () => {
			sut.avatar.eyes.should.equal(eyesElement);
		});
	});

	describe('add hair', () => {
		let
			hairType;

		beforeEach(() => {
			hairType = {};
			sut.addHair(hairType);
		});

		it('should create hair element', () => {
			AvatarService.createImageElement.should.calledWith(AVATAR_ELEMENTS.hair[hairType]);
		});
	});

	describe('add eyebrows', () => {
		let
			eyebrowsType,
			eyebrowsElement;

		beforeEach(() => {
			eyebrowsType = {};
			eyebrowsElement = {};
			sut.refreshAvatar = env.stub();
			AvatarService.createPathElement.withArgs(AVATAR_ELEMENTS.eyebrows[eyebrowsType]).returns(eyebrowsElement)
			sut.addEyebrows(eyebrowsType);
		});

		it('should create eyebrows element', () => {
			sut.avatar.eyebrows.should.equal(eyebrowsElement);
		});

		it('should refresh avatar canvas', () => {
			sut.refreshAvatar.should.called;
		});
	});

	describe('add nose', () => {
		let
			noseType,
			noseElement;

		beforeEach(() => {
			noseType = {};
			noseElement = {};
			sut.refreshAvatar = env.stub();
			AvatarService.createPathElement.withArgs(AVATAR_ELEMENTS.nose[noseType]).returns(noseElement)
			sut.addNose(noseType);
		});

		it('should create nose element', () => {
			sut.avatar.nose.should.equal(noseElement);
		});

		it('should refresh avatar canvas', () => {
			sut.refreshAvatar.should.called;
		});
	});

	describe('add mouth', () => {
		let
			mouthType,
			mouthElement;

		beforeEach(() => {
			mouthType = {};
			mouthElement = {};
			sut.refreshAvatar = env.stub();
			AvatarService.createPathElement.withArgs(AVATAR_ELEMENTS.mouth[mouthType]).returns(mouthElement)
			sut.addMouth(mouthType);
		});

		it('should create mouth element', () => {
			sut.avatar.mouth.should.equal(mouthElement);
		});

		it('should refresh avatar canvas', () => {
			sut.refreshAvatar.should.called;
		});
	});

	describe('save avatar', () => {
		let
			event,
			canvas;

		beforeEach(() => {
			event = {};
			canvas = {};
			sut.avatarCanvas = canvas;
			sut.saveAvatar(event);
		});

		it('should save current canvas state', () => {
			AvatarService.saveAvatar.should.calledWith(event, canvas);
		});
	});

	describe('animate eyes', () => {
		let
			element,
			canvas;

		beforeEach(() => {
			element = {};
			canvas = {};
			sut.avatar.eyes = element;
			sut.avatarCanvas = canvas;
			sut.animateEyes();
		});

		it('should save current canvas state', () => {
			AvatarService.blinkElement.should.calledWith(element, canvas);
		});
	});


});