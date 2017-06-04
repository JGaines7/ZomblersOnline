"use strict"
//generic game object has basic properties and functions for any element in the game.

function GenericGameObject(position, velocity)
{
	"use strict"
	this.position = position;
	this.velocity = velocity;
	//update object position based on current velocity and time delta
	this.updatePosition = function(timeDelta) { this.position.add(this.velocity.multiply(timeDelta));}

	//Add any properties that are shared between all game objects.


  
}