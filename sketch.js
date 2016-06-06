var canvas;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("home");
}

function draw() {
	fill(255, 0, 0);
	ellipse(mouseX, mouseY, 80, 80);
	console.log("draw " + mouseX + ", " + mouseY);
}