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

	addFace(faceType) {
		this.AvatarService.createImageElement(AVATAR_ELEMENTS.face[faceType])
			.then(newFace => {
				this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.face, newFace);
				this.avatar.face = newFace;
			});
	}

	addHair(hairType) {
		this.AvatarService.createImageElement(AVATAR_ELEMENTS.hair[hairType])
			.then(newHair => {
				this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.hair, newHair);
				this.avatar.hair = newHair;
			});
	}

	addEyes() {
		let newEyes = this.AvatarService.createEyes(AVATAR_ELEMENTS.eyes);
		this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.eyes, newEyes);
		this.avatar.eyes = newEyes;
	}

	addEyebrows(eyebrowsType) {
		let newEyebrows = this.AvatarService.createPathElement(AVATAR_ELEMENTS.eyebrows[eyebrowsType]);
		this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.eyebrows, newEyebrows);
		this.avatar.eyebrows = newEyebrows;
	}

	addNose(noseType) {
		let newNose = this.AvatarService.createPathElement(AVATAR_ELEMENTS.nose[noseType]);
		this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.nose, newNose);
		this.avatar.nose = newNose;
	}

	addMouth(mouthType) {
		let newMouth = this.AvatarService.createPathElement(AVATAR_ELEMENTS.mouth[mouthType]);
		this.AvatarService.replaceElement(this.avatarCanvas, this.avatar.mouth, newMouth);
		this.avatar.mouth = newMouth;
	}

	saveAvatar(e) {
		this.AvatarService.saveAvatar(e, this.avatarCanvas);
	}

	animateEyes() {
		this.AvatarService.blinkElement(this.avatar.eyes, this.avatarCanvas);
	}
}