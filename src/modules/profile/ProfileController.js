import AVATAR_ELEMENTS from './AVATAR_ELEMENTS';

export default class ProfileController {
	constructor($window, FabricService, $timeout) {
		'ngInject';

		this.FabricService = FabricService;
		this.$timeout = $timeout;

		this.canvas = new FabricService.Canvas('background');

		this.avatar = {
			face: AVATAR_ELEMENTS.face.default,
			hair: null,
			eyes: null,
			eyebrows: null,
			nose: null,
			mouth: null
		};
					
		this.refreshAvatar();
    }

	addImageElement(canvas, element) {
		this.FabricService.Image.fromURL(element.imageUrl, oImg => {
			oImg.setFlipX(true);
			oImg.selectable = false;
			oImg.top = element.top;
			oImg.left = element.left;
			canvas.add(oImg);
		});
	}

	drawElement(canvas, element) {
		let path = new fabric.Path(element.path);
		path.set(element.options);
		canvas.add(path);
	}

	refreshAvatar() {
		let element;

		this.clearAvatar();
		Object.keys(this.avatar).forEach(key => {
			element = this.avatar[key];
			if (element) {
				element.path
					? this.drawElement(this.canvas, element)
					: this.addImageElement(this.canvas, element);
			}
		});
	}

	addEyes() {
		const
			leftEye = new this.FabricService.Circle(AVATAR_ELEMENTS.eyes.left),
			rightEye = new this.FabricService.Circle(AVATAR_ELEMENTS.eyes.right);

		this.avatar.eyes = new this.FabricService.Group([leftEye, rightEye], {
			selectable: false,
		});
		this.canvas.add(this.avatar.eyes);
	}

	addHair(hairType) {
		this.avatar.hair = AVATAR_ELEMENTS.hair[hairType];
		this.refreshAvatar();
	}

	addEyebrows(eyebrowsType) {
		this.avatar.eyebrows = AVATAR_ELEMENTS.eyebrows[eyebrowsType];
		this.refreshAvatar();
	}

	addNose(noseType) {
		this.avatar.nose = AVATAR_ELEMENTS.nose[noseType];
		this.refreshAvatar();
	}

	addMouth(mouthType) {
		this.avatar.mouth = AVATAR_ELEMENTS.mouth[mouthType];
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
		this.addEyes();
		this.$timeout(() => {
			this.avatar.eyes.animate('opacity', 0, {
				duration: 200,
				onChange: this.canvas.renderAll.bind(this.canvas),
				onComplete: this.animateEyes.bind(this)
			})
		}, 2000);
	}
}