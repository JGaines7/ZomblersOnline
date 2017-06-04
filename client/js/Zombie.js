function Zombie(position, velocity, kills)
{
	"use strict"
	GenericGameObject.call(this, position, velocity);

	//just a placeholder property. Not sure what all needs to be in here
	this.kills = kills;
}