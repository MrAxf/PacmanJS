export default class ImageBuffer  {
	constructor(width, height){
		this.canvas = document.createElement('canvas')
		this.canvas.width = width
		this.canvas.height = height
		this.context = this.canvas.getContext('2d')
	}
	clear(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}
}