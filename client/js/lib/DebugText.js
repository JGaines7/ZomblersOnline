
"use strict"
var debugValues = {}

function debugLog(key, value)
{

	debugValues[key] = value;


}

function drawDebugValues(canvas)
{
	var yval = 100;

	canvas.font = "14px Arial";

	canvas.fillStyle = '#000000';
	
	for (var key in debugValues)
	{
		canvas.fillText(key + " : " + debugValues[key] ,10,yval); 
		yval += 16;

	}
}