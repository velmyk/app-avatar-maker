import AVATAR_ELEMENTS from './AVATAR_ELEMENTS';

export default class ProfileController {
	constructor($window, FabricService) {
		'ngInject';

		this.FabricService = FabricService;

		this.canvas = new FabricService.Canvas('background');

		this.avatar = {
			face: AVATAR_ELEMENTS.face.default,
			hair: null,
			eyes: null,
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

	addHair(hairType) {
		this.avatar.hair = AVATAR_ELEMENTS.hair[hairType];
		this.refreshAvatar();
	}

	addEyes(eyesType) {
		this.avatar.eyes = AVATAR_ELEMENTS.eyes[eyesType];
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
		console.log(e);
		link.href = this.canvas.toDataURL();
		link.download = 'avatar.png';
	}
}