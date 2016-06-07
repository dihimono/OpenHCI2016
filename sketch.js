var canvas;


//dots
var dotX = [80.89, 66.84, 182.42, 262.89, 412.7, 612.76, 776.09, 994.39, 1034.39, 1174.74, 1310.08, 1328.54, 1373.7, 1396.28, 1440];
var dotY = [632.91, 382.34, 404.11, 266.51, 162.66, 118.89, 138.06, 322.66, 169.74, 402.58, 263.32, 443.63, 498.29, 581.13, 401.26];
var dotR = [19.78, 10.94, 8.15, 10.15, 9.2, 4.27, 5.26, 10.15, 5.26, 8.16, 5.26, 9.32, 5.26, 12.58, 16.5];
var curDotX = [], curDotY = [], dotState = [];
var dotCoreX, dotCoreY, dotNum, dotColor = [236, 18, 91];

//lines or img
var lineState = [];
var lineOpa = [];
var lineNum;
var lineStartX = [0];
var lineStartY = [0];
var lineEndX = [550];
var lineEndY = [550];

//horns
var hornStartX = [0];
var hornStartY = [0];
var hornEndX = [50];
var hornEndY = [80];
var hornStartR = [100];
var hornEndR = [5];
var hornStartColor = [236, 28, 91], hornEndColor = [0, 0, 0];
var hornCurX = [];
var hornCurY = [];
var hornState = [];
var hornNum;


function setup() {
	//setup framerate
	frameRate(30);

	//setup canvas
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent("home");

	//setup dots
	dotCoreX = windowWidth / 2;
	dotCoreY = windowHeight;
	dotNum = 15;
	for(var i = 0;i < dotNum;i++) {
		curDotX[i] = dotCoreX;
		curDotY[i] = dotCoreY;
		dotState[i] = true;
	}

	//setup lines
	lineNum = 1;
	for(var i = 0;i < lineNum;i++) {
		lineOpa[i] = 255;
		lineState[i] = true;
	}

	//setup horns
	hornNum = 1;
	for(var i = 0;i < hornNum;i++) {
		hornState[i] = 0;
		hornCurX[i] = hornStartX[i];
		hornCurY[i] = hornStartY[i];
	}
}

function drawDots() {
	noStroke();
	fill(dotColor[0], dotColor[1], dotColor[2]);
	for(var i = 0;i < dotNum;i++) {
		console.log(curDotX[i] + ", " + curDotY[i]);
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

function drawLines() {
	for(var i = 0;i < lineNum;i++) {
		stroke(255, lineOpa[i]);
		line(lineStartX[i], lineStartY[i], lineEndX[i], lineEndY[i]);
		if(lineState[i] == true) lineOpa[i]--;
		else lineOpa[i]++;

		if(lineOpa[i] == 255) lineState[i] = true;
		if(lineOpa[i] == 127) lineState[i] = false;
	}
}

function drawHorns() {
	noStroke();
	for(var i = 0;i < hornNum;i++) {
		if(dist(hornCurX[i], hornCurY[i], hornStartX[i], hornStartY[i]) < 1)
			hornState[i] = 0;
		if(dist(mouseX, mouseY, hornStartX, hornStartY) < hornStartR[i]) {
			if(hornState[i] == 0) hornState[i] = 1;
		}
		else {
			if(hornState[i] == 1) hornState[i] = -1;
		}
		if(dist(hornCurX[i], hornCurY[i], hornEndX[i], hornEndY[i]) < 1)
			hornState[i] = -1;
		if(hornState[i] == 0) continue;
		var v = createVector(hornEndX[i] - hornStartX[i], hornEndY[i] - hornStartY[i]);
		var c = createVector(hornEndColor[0] - hornStartColor[0], hornEndColor[1] - hornStartColor[1], hornEndColor[2] - hornStartColor[2]);
		var r = createVector(hornEndR[i] - hornStartR[i], 0);
		v.normalize();
		c.normalize();
		r.normalize();
		fill(c.x, c.y, c.z);
		var tx = hornStartX[i], ty = hornStartY[i], tr = hornStartR[i], tc = createVector(hornStartColor[0], hornStartColor[1], hornStartColor[2]);
		while(1) {
			fill(tc.x, tc.y, tc.z);
			ellipse(tx, ty, tr, tr);
			if(abs(tx - hornCurX[i]) < 1 || abs(ty - hornCurY[i]) < 1) break;
			tx += v.x, ty += v.y, tr += r.x, tc = p5.Vector.add(c, tc);
		}
		if(hornState[i] == 1) {
			//growing outward
			hornCurX[i] += v.x;
			hornCurY[i] += v.y;
		}
		else if(hornState[i] == -1) {
			//growing inward
			hornCurX[i] -= v.x;
			hornCurY[i] -= v.y;
		}
	}
}

function draw() {
	clear();
	drawDots();
	drawLines();
	drawHorns();
}