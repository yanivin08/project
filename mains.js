let canvas = document.getElementsByTagName('canvas')[0],
	div = document.getElementsByTagName('div')[0];
	ctx = canvas.getContext("2d");
	
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

ctx.translate(canvas.width/2,canvas.height/2);
ctx.scale(1,-1);

let count = 5, type = "", myLoop, myLoops, collide = 0, times = 0;

function createCircle(){
	ctx.beginPath();
	ctx.arc(0,0,200,0,Math.PI*2);
	ctx.stroke();
	ctx.closePath();
}

class dots{
	constructor(){
		this.r = 200;
		this.y = 0;
		this.x = 0;
		this.maxX = 0;
	}
	random(){
		//random y from -radius to +radius
		this.y = Math.random() * (this.r - (-this.r)) + (-this.r);
		//get the x from x2 + y2 < r2
		//x = sqrt(r2 - y2)
		this.maxX = Math.sqrt(Math.pow(this.r,2) - Math.pow(this.y,2));
		//random from maxX
		if(type == "random"){
			this.x = Math.random() * (this.maxX - (-this.maxX)) + (-this.maxX);
		}else{
			this.x = Math.random() < 0.5 ? this.maxX : -this.maxX;
		}
	}
	drawDots(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,2,0,Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
}


function createLine(){
	//create line to form a triangle
	ctx.beginPath()
	ctx.moveTo(points[0].x,points[0].y);
	ctx.lineTo(points[1].x,points[1].y);
	ctx.lineTo(points[2].x,points[2].y);
	ctx.lineTo(points[0].x,points[0].y);
	ctx.stroke();
	ctx.closePath();
}

function drawCircle(color){
	//add small dot in a middle of a circle
	ctx.beginPath();
	ctx.arc(0,0,3,0,Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill()
	ctx.closePath();
}


function insideCircle(){
	//check if small dot is inside the triangle
	times += 1;
	let a = dist(points[0].x,points[0].y,points[1].x,points[1].y);
	let b = dist(points[1].x,points[1].y,points[2].x,points[2].y);
	let c = dist(points[2].x,points[2].y,points[0].x,points[0].y);
	
	if(a*b > 0 && b*c > 0){
		collide += 1;
		drawCircle("red");
	}else{
		drawCircle("black");
	}
	
	document.getElementsByTagName("p")[0].innerHTML = Math.round(collide/times * 100) + " %";
}


function dist(x1,y1,x2,y2){
	return (0-y1)*(x2-x1) - (0-x1)*(y2-y1);
}

let circles = new dots();
createCircle();

function randomCircles(){
	type = "random";
	//this would give random dots in a circle
	circles.random();
	circles.drawDots()
	if(type == "random"){
		myLoop = requestAnimationFrame(randomCircles);
	}else{
		ctx.clearRect(-canvas.width/2,canvas.height/2,10000,-10000);
		cancelAnimationFrame(myLoop);
	}
}

function checkCollision(){
	type = "collision";
	if(count == 0){
		points = [];
		ctx.clearRect(-canvas.width/2,canvas.height/2,10000,-10000);
		createCircle();
		for(i=0;i<3;i++){
			circles = new dots();
			points.push(circles);
		}
		points.forEach(x => x.random());
		createLine();
		insideCircle();
		count = 50;	
	}
	count -= 1;
	if(type == "collision"){
		myLoops = requestAnimationFrame(checkCollision);
	}else{
		ctx.clearRect(-canvas.width/2,canvas.height/2,10000,-10000);
		cancelAnimationFrame(myLoops);
	}
}


