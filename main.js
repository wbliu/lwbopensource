var WINDOW_WIDTH = document.body.clientWidth;
var WINDOW_HEIGHT = document.body.clientHeight;//.offsetHeight;

var MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
var MARGIN_TOP=100 ;

var RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

var HOURS=0,MINUTES=0,SECONDS=0;

var balls=[];
var  colors=["red","#0099CC","blue","green","yellow","#ff5500","gray","#abc"];

window.onload = function(){
	var canvas = document.getElementById("canvas");
	var cxt = canvas.getContext("2d") ;


	canvas.width = WINDOW_WIDTH ;
	canvas.height = WINDOW_HEIGHT  ;

	setInterval(function(){
		render(cxt);
		update();

	},50);
	// render(cxt) ;
}

function update(){
	var now = new Date();
	if(parseInt(now.getHours()/10)!=parseInt(HOURS/10)){
		addBalls(MARGIN_LEFT+0*(RADIUS+1),MARGIN_TOP,parseInt(HOURS/10));
	}
	if(parseInt(now.getHours()%10)!=parseInt(HOURS%10)){
		addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(HOURS%10));	
	}
	if(parseInt(now.getMinutes()/10)!=parseInt(MINUTES/10)){
		addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(MINUTES/10));
	}
	if(parseInt(now.getMinutes()%10)!=parseInt(MINUTES%10)){
		addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(MINUTES%10));
	}
	if(parseInt(now.getSeconds()/10)!=parseInt(SECONDS/10)){
		addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(SECONDS/10));
	}
	if(parseInt(now.getSeconds()%10)!=parseInt(SECONDS%10)){
		addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(SECONDS%10));	
	}
	getCurrentTime();
	updateBalls();
}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=(WINDOW_HEIGHT-RADIUS)){
			balls[i].y=(WINDOW_HEIGHT-RADIUS);
			balls[i].vy=-balls[i].vy*0.75;
		}

		
	}

	var cnt = 0;

	for(var i=0;i<balls.length;i++){
		if(balls[i].x>(-RADIUS)&&balls[i].x<WINDOW_WIDTH+RADIUS){
			balls[cnt++]=balls[i];
		}		
	}

	while(balls.length>Math.min(1000,cnt)){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x: x+j*2*(RADIUS+1),
					y: y+i*2*(RADIUS+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy: -5,
					color: colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(HOURS/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(HOURS%10),cxt);

	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(MINUTES/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(MINUTES%10),cxt);

	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(SECONDS/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(SECONDS%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath() ;
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();

		cxt.fill();
	}

}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";

	for (var i = 0; i <digit[num].length; i++) {

		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}

function getCurrentTime(){
	var currentDate = new Date();
	HOURS=currentDate.getHours();
	MINUTES=currentDate.getMinutes();
	SECONDS=currentDate.getSeconds();
}