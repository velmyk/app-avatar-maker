import fabric from 'fabric';

export default class FabricService {
	constructor() {
		Object.assign(this, fabric.fabric);
	}
}