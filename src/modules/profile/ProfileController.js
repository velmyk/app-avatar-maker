export default class ProfileController {
    constructor($window, FabricService) {
    	'ngInject';

    	const
    		canvas = new FabricService.Canvas('background');
		FabricService.Image.fromURL('https://s-media-cache-ak0.pinimg.com/736x/74/f0/a5/74f0a561e09d83a10cb42e7ecafeb468.jpg', oImg => {
			oImg.scale(0.5).setFlipX(true);
  			canvas.add(oImg);
		});

    }
}