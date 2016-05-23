export default {
	face: {
		default: {
			imageUrl: '../../src/images/face_default.png',
			top: 100,
			left: 100
		}
	},
	hair: {
		male: {
			imageUrl: '../../src/images/hair-mail.png',
			top: 60,
			left: 110
		},
		female: {
			imageUrl: '../../src/images/hair-femail.png',
			top: 50,
			left: 105
		}
	},
	eyes: {
		angry: {
			path: 'M 200 350 L 270 350 L 200 320 z M 400 350 L 330 350 L 400 320 z',
			options: {}
		},
		sad: {
			path: 'M 200 350 L 270 350 L 270 320 z M 400 350 L 330 350 L 330 320 z',
			options: {}
		},
		neutral: {
			path: 'M 200 350 L 270 350 L 235 335 z M 400 350 L 330 350 L 365 335 z',
			options: {}
		}
	},
	nose: {
		down: {
			path: 'M 330 370 L 300 400 L 330 400',
			options: {
				angle: 45
			}
		},
		up: {
			path: 'M 330 420 L 300 450 L 330 450',
			options: {
				angle: -135
			}
		}
	},
	mouth: {
		smile: {
			path: 'M 260 450 L 340 450 L 360 430',
			options: {}
		},
		sad: {
			path: 'M 260 450 L 340 450 L 340 470',
			options: {}
		}
	}
};