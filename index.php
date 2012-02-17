<html>
<head>
	<title>Brick Breaker</title>
	<script type="text/javascript" src="jquery.js"></script>
	<script type="text/javascript" src="engine.js"></script>
	<link rel="stylesheet" type="text/css" href="main.css" />
	<script type="text/javascript">
	$(window).load(function(){$("#game-canvas").brickBreaker();});
	</script>
</head>
<body>

<div id="game-wrapper">
	<center>Brick Breaker</center><br/>
	<canvas id="game-canvas" width="500" height="200">
	<p>Your browser doesn't support the latest technologies of HTML5. Please get with the program.</p>
	</canvas><br/>
	Ball Count: <span id="ball-count"></span>
	<br>
	Score: <span id="score"></span>
</div>
</body>
</html>
