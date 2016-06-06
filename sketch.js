var canvas;

var dotX = [80.89, 66.84, 182.42, 262.89, 412.7, 612.76, 776.09, 994.39, 1034.39, 1174.74, 1310.08, 1328.54, 1373.7, 1396.28, 1440];
var dotY = [632.91, 382.34, 404.11, 266.51, 162.66, 118.89, 138.06, 322.66, 169.74, 402.58, 263.32, 443.63, 498.29, 581.13, 401.26];
var dotR = [19.78, 10.94, 8.15, 10.15, 9.2, 4.27, 5.26, 10.15, 5.26, 8.16, 5.26, 9.32, 5.26, 12.58, 16.5];
var curDotX = [], curDotY = [], dotState = [];
var dotCoreX, dotCoreY, dotNum, dotColor = [236, 18, 91];

function setup() {
	//setup canvas
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("home");

	//disalbe strokes
	noStroke();

	//setup dots
	dotCoreX = windowWidth / 2;
	dotCoreY = windowHeight;
	dotNum = 15;
	for(var i = 0;i < dotNum;i++) {
		curDotX[i] = dotCoreX;
		curDotY[i] = dotCoreY;
		dotState[i] = true;
	}
}

function drawDots() {
	fill(dotColor[0], dotColor[1], dotColor[2]);
	for(var i = 0;i < dotNum;i++) {
		var v = createVector(dotX[i] - dotCoreX, dotY[i] - dotCoreY);
		v.normalize();
		if(dotState[i] == true) {
			// going outward
			fill(dotColor[0], dotColor[1], dotColor[2]);
			curDotX[i] += v.x;
			curDotY[i] += v.y;
			ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
		}
		else {
			// going inward
			curDotX[i] -= v.x;
			curDotY[i] -= v.y;
			ellipse(curDotX[i], curDotY[i], dotR[i], dotR[i]);
		}
		if(curDotX[i] <= 0 || curDotX[i] >= windowWidth || curDotY[i] <= 0)
			dotState[i] = false;
		if(curDotX[i] == dotCoreX && curDotY[i] == dotCoreY)
			dotState[i] = true;
	}
}

function draw() {
	clear();
	drawDots();
}