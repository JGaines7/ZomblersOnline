//Gameworld holds the state of all elements in the world. (Players, map, ammo, projectiles, scores)
//Gameworld should have a full set of interfaces to be updated (and read?) 
//There should be 0 networking code in here
//Ideally this can be used both server and client side.
//Server will maintain the authoritative game state in its copy.
//Clients will update theirs based on server updates.
//Interpolation and prediction can be handled by a separate class that updates the gameworld via same interface.
//Think about interpolation later. this class DOES NOT CARE about such matters.


function GameWorld(width, height) {
	"use strict"
	//TODO Could we pass in a GameWorldConfig on construction?
	this.worldWidth = width;
	this.worldHeight = height;
	
	this.players = [];
	this.zombies = [];
	
}
