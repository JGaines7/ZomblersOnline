"use strict"
var debugValues = {}


//Add or update a key value pair to the debug list.
function debugLog(key, value)
{

	debugValues[key] = value;


}
//Draw all debug values to the screen
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