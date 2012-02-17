lock = false;

/* 
	Brick Breaker
		Lightweight HTML5 Brick Breaker
	
	Author: Atticus White 
	        - contact@atticuswhite.com
			- www.atticuswhite.com
*/
(function($){
	
	var canvas;
	var canvas_id;
	
	var balls = new Array();
	
	var globals = {
		canvas: null,
		block : new Array(),
		balls: new Array(),
		paddle: null,
		speeds: { },
		width: 200,
		height: 200,
		mouseX: 0,
		mouseY: 0,
		o: 0,
		pmouseY: 0
	};
	var settings = {
		speed: 'medium',
		fadeSpeed: 800,
		leftButton: null,
		rightButton: null,
		loop_speed: 6,
		paddle_width: 75
	};
	
	
	var methods = {
	};
	
	
	// core
	var engine = {
		updatePaddle: function(){
			canvas.beginPath();
			canvas.moveTo(globals.mouseX - (settings.paddle_width/2) , globals.height-20);
			canvas.lineTo(globals.mouseX + (settings.paddle_width/2), globals.height-20);
			canvas.closePath();
			canvas.stroke();
		},
		draw: function(){
			engine.clear();
			engine.updatePaddle();
			$.each(balls, function(i,ball){
				if (ball != null)
					ball.update();
			});
		},
		updateStats: function(){
			$("#ball-count").html(balls.length);
			
		},
		clear: function(){
			canvas.clearRect(0,0,globals.width,globals.height);
		},
		drawInternal: function(){
			engine.draw();
			engine.updateStats();
			globals.pmouseX = globals.mouseX;
			globals.pmouseY = globals.mouseY;
		}
	};
	
	// handle mouse events
	var io = {
		onDocumentMouseMove: function(e){
			var offsetLeft = $("#"+canvas_id).offset().left;
			if (e.clientX > offsetLeft){
				globals.mouseX = e.clientX - offsetLeft
			} else {
				globals.mouseX = 0;
			}
			globals.mouseY = e.clientY - canvas.offsetTop;
		},
		onDocumentMouseClick: function(e){
			if (balls.length < 2){
				balls.push(new ball(globals.mouseX,20));
			}
		}
	};
	
	// engine loop
	var loop = function(){
		engine.drawInternal();
		setTimeout(loop, settings.loop_speed);
	};
	
	// ball object
	var ball = function(x,y){	
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 1;
		this.radius = 8;
		this.px = x;
		this.py = y;
		this.speed = .5;
		this.angle = 0;
		this.radius = 8;
		this.direction = 1;
		
		this.shoot = function(){
			this.x = globals.mouseX;
			this.y = globals.height-30;
			this.direction = -1;
		}
		this.shoot();
		
		this.update = function(){
			this.y += (this.speed * this.direction);
			this.x += this.dx;
			canvas.beginPath();
			canvas.arc(this.x,this.y,this.radius,0, Math.PI*2, true);
			canvas.stroke();
			this.checkCollision();
			this.checkBounds();
		}
		
		this.checkCollision = function(){
			var left_bound;
			var right_bound;
			var y_bound = globals.height-20;
			
			if (this.y > globals.height-25 && this.y < globals.height-18){
				if ( (this.x > (globals.mouseX - settings.paddle_width/2)) &&
					 (this.x < (globals.mouseX + settings.paddle_width/2))){

						this.direction = -this.direction;
						
				}
			}
		}
		
		this.destroy = function(){
			var idx = balls.indexOf(this);
			balls.splice(idx,1);
		}
		
		this.checkBounds = function(){
			if (this.y < 5){
				this.direction = -this.direction;
			}else if (this.y > globals.height -5){
				this.destroy();
			}
		}
		
	}
	
	
	var block = function(x,y){
		this.x = x;
		this.y = y;
		this.w = 50;
		this.h = 10;
		this.durability = 1;
	}


	// init
	jQuery.fn.brickBreaker = function(){
		lock = true;
		canvas_id = "game-canvas";
		//if (options)
			//$.extend(settings, options);
//		if (!$(canvas_id).getContext)
			//return;
		var c = document.getElementById(canvas_id);
		canvas = c.getContext("2d");
		globals.width  = $("#"+canvas_id).width();
		globals.height = $("#"+canvas_id).height();
		console.log(globals);
		canvas.beginPath();
		canvas.moveTo(25,globals.height+90);
		canvas.lineTo(75,globals.height+90);
		canvas.closePath();
		canvas.stroke();
		document.addEventListener('mousemove', io.onDocumentMouseMove, false);
		document.addEventListener('mousedown', io.onDocumentMouseClick, false);
		loop();
	};
})(jQuery);


var drawingCanvas = $("#game-canvas");
var context = null;
if (drawingCanvas.getContext){
	// init 2d drawing context
	
}