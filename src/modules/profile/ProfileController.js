import AVATAR_ELEMENTS from './AVATAR_ELEMENTS';

export default class ProfileController {
	constructor(AvatarService) {
		'ngInject';

		this.AvatarService = AvatarService;

		this.avatar = {
			face: null,
			hair: null,
			eyes: null,
			eyebrows: null,
			nose: null,
			mouth: null
		};
					
		this.initialize();
    }

    initialize() {
    	this.avatarCanvas = this.AvatarService.createCanvas('avatar');
    	this.addFace('default');
    	this.addEyes();
    }


	refreshAvatar() {
		this.AvatarService.clearCanvas(this.avatarCanvas);
		this.AvatarService.displayElements(this.avatarCanvas, this.avatar);
	}

	addFace(faceType) {
		this.AvatarService.createImageElement(AVATAR_ELEMENTS.face[faceType])
			.then(face => {
				this.avatar.face = face;
				this.refreshAvatar();
			});
	}

	addEyes() {
		this.avatar.eyes = this.AvatarService.createEyes(AVATAR_ELEMENTS.eyes);
	}

	addHair(hairType) {
		this.AvatarService.createImageElement(AVATAR_ELEMENTS.hair[hairType])
			.then(hair => {
				this.avatar.hair = hair;
				this.refreshAvatar();
			});
	}

	addEyebrows(eyebrowsType) {
		this.avatar.eyebrows = this.AvatarService.createPathElement(AVATAR_ELEMENTS.eyebrows[eyebrowsType]);
		this.refreshAvatar();
	}

	addNose(noseType) {
		this.avatar.nose = this.AvatarService.createPathElement(AVATAR_ELEMENTS.nose[noseType]);
		this.refreshAvatar();
	}

	addMouth(mouthType) {
		this.avatar.mouth = this.AvatarService.createPathElement(AVATAR_ELEMENTS.mouth[mouthType]);
		this.refreshAvatar();
	}


	saveAvatar(e) {
		this.AvatarService.saveAvatar(e, this.avatarCanvas);
	}

	animateEyes() {
		this.AvatarService.blinkElement(this.avatar.eyes, this.avatarCanvas);
	}
}