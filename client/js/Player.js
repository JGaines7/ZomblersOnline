function Player(position, velocity, name)
{
	"use strict"
	GenericGameObject.call(this,position, velocity);
 
	this.name = name;
  
}