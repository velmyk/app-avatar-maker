import AVATAR_ELEMENTS from './AVATAR_ELEMENTS';

export default class ProfileController {
	constructor(FabricService, $timeout, $q) {
		'ngInject';

		this.FabricService = FabricService;
		this.$timeout = $timeout;
		this.$q = $q;

		this.canvas = new FabricService.Canvas('background');

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
    	this.addFace('default');
    	this.drawEyes();
    }

	addImageElement(canvas, element) {
		return this.$q((resolve, reject) => {
			this.FabricService.Image.fromURL(element.imageUrl, oImg => {
				oImg.setFlipX(true);
				oImg.selectable = false;
				oImg.top = element.top;
				oImg.left = element.left;

				resolve(oImg);
			});
		});
	}

	addElement(canvas, element) {
		let path = new fabric.Path(element.path);
		path.set(element.options);
		return path;
	}

	refreshAvatar() {
		this.clearAvatar();
		this.displayElements();
	}

	displayElements() {
		Object.keys(this.avatar).forEach(key => this.avatar[key] ? this.canvas.add(this.avatar[key]) : '')
	}

	addFace(faceType) {
		this.addImageElement(this.canvas, AVATAR_ELEMENTS.face[faceType])
			.then(face => {
				this.avatar.face = face;
				this.refreshAvatar();
			});
	}

	drawEyes() {
		const
			leftEye = new this.FabricService.Circle(AVATAR_ELEMENTS.eyes.left),
			rightEye = new this.FabricService.Circle(AVATAR_ELEMENTS.eyes.right);

		this.avatar.eyes = new this.FabricService.Group([leftEye, rightEye], {
			selectable: false,
		});
	}

	addHair(hairType) {
		this.addImageElement(this.canvas, AVATAR_ELEMENTS.hair[hairType])
			.then(hair => {
				this.avatar.hair = hair;
				this.refreshAvatar();
			});
	}

	addEyebrows(eyebrowsType) {
		this.avatar.eyebrows = this.addElement(this.canvas, AVATAR_ELEMENTS.eyebrows[eyebrowsType]);
		this.refreshAvatar();
	}

	addNose(noseType) {
		this.avatar.nose = this.addElement(this.canvas, AVATAR_ELEMENTS.nose[noseType]);
		this.refreshAvatar();
	}

	addMouth(mouthType) {
		this.avatar.mouth = this.addElement(this.canvas, AVATAR_ELEMENTS.mouth[mouthType]);
		this.refreshAvatar();
	}

	clearAvatar() {
		this.canvas.clear();
	}

	saveAvatar(e) {
		let link = e.target;
		link.href = this.canvas.toDataURL();
		link.download = 'avatar.png';
	}

	animateEyes() {
		this.avatar.eyes.set('opacity', 0);
		this.$timeout(() => {
			this.avatar.eyes.animate('opacity', 1, {
				duration: 200,
				onChange: this.canvas.renderAll.bind(this.canvas),
				onComplete: this.animateEyes.bind(this)
			});
		}, 2000);
	}
}