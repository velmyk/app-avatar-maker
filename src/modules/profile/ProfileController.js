export default class ProfileController {
    constructor($window, FabricService) {
    	'ngInject';

    	const
    		canvas = new FabricService.Canvas('background');
    				
		FabricService.Image.fromURL('../../src/images/face_default.png', oImg => {
			oImg.setFlipX(true);
			oImg.selectable = false;
			oImg.top = 100;
			oImg.left = 100;
  			canvas.add(oImg);
		});

		FabricService.Image.fromURL('../../src/images/hair-mail.png', oImg => {
			oImg.setFlipX(true);
			oImg.top = 60;
			oImg.left = 110;
  			canvas.add(oImg);
		});

    }
}