export default class ScreenUtil {

	static getScreenCordinates(obj) {
		let p = {};
		p.left = obj.offsetLeft;
		p.top = obj.offsetTop;
		while (obj.offsetParent) {
			p.left = p.left + obj.offsetParent.offsetLeft;
			p.top = p.top + obj.offsetParent.offsetTop;
			if (obj === document.getElementsByTagName("body")[0]) {
				break;
			}
			else {
				obj = obj.offsetParent;
			}
		}
		return p;
	}

}