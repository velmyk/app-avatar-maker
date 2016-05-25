export default class AvatarService {
	constructor(FabricService, $timeout, $q) {
		'ngInject';

		this.FabricService = FabricService;
		this.$timeout = $timeout;
		this.$q = $q;
    }

    createCanvas(canvas) {
		return new this.FabricService.Canvas(canvas);
	}

	createImageElement(element) {
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

	createPathElement(element) {
		let path = new fabric.Path(element.path);
		path.set(element.options);
		return path;
	}

	createEyes(eyes) {
		const
			leftEye = new this.FabricService.Circle(eyes.left),
			rightEye = new this.FabricService.Circle(eyes.right);

		return new this.FabricService.Group([leftEye, rightEye], {
			selectable: false,
		});
	}

	replaceElement(canvas, fromElement, toElement) {
		if(fromElement) {
			canvas.remove(fromElement);
		}
		canvas.add(toElement);
	}

	saveAvatar(e, canvas) {
		let link = e.target;
		link.href = canvas.toDataURL();
		link.download = 'avatar.png';
	}

	blinkElement(element, canvas) {
		element.set('opacity', 0);
		this.$timeout(() => {
			element.animate('opacity', 1, {
				duration: 200,
				onChange: canvas.renderAll.bind(canvas),
				onComplete: this.blinkElement.bind(this, element, canvas)
			});
		}, 2000);
	}
}