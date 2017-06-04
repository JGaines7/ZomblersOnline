//This class listens for inputs on the canvas element
//This class should set flags to be used by the gameloop

function InputsCanvas()
{
	"use strict"
	this.canvas = document.getElementById('cvs');
	console.log(this.canvas.width + " : " + this.canvas.height)
    //this.canvas.addEventListener('mousemove', this.gameInput, false);
    //this.canvas.addEventListener('mouseout', this.outOfBounds, false);

    this.directionalKeysState = { 
        north: false,
        east: false,
        south: false,
        west: false,
    }

    var selfs = this;

    this.canvas.addEventListener('keydown', function(event)
    {

        if (globalVals.KEY_LEFT == event.keyCode)
        {
            selfs.directionalKeysState.west = true;
        }
        else if (globalVals.KEY_UP == event.keyCode)
        {
            selfs.directionalKeysState.north = true;
        } 
        else if (globalVals.KEY_RIGHT == event.keyCode)
        {
            selfs.directionalKeysState.east = true;
        }
        else if (globalVals.KEY_DOWN == event.keyCode)
        {
            selfs.directionalKeysState.south = true;
        }

        
    }, false);
    this.canvas.addEventListener('keyup', function(event)
    {

        if (globalVals.KEY_LEFT == event.keyCode)
        {
            selfs.directionalKeysState.west = false;
        }
        else if (globalVals.KEY_UP == event.keyCode)
        {
            selfs.directionalKeysState.north = false;
        } 
        else if (globalVals.KEY_RIGHT == event.keyCode)
        {
            selfs.directionalKeysState.east = false;
        }
        else if (globalVals.KEY_DOWN == event.keyCode)
        {
            selfs.directionalKeysState.south = false;
        }

        
    }, false);

    this.getMovementDirection = function()
    {
        var retVal = new Vector(0,0);
        if (this.directionalKeysState.north == true)
        {
            retVal.add(globalVals.DIR_NORTH);
        }
        if (this.directionalKeysState.east == true)
        {
            retVal.add(globalVals.DIR_EAST);
        }
        if (this.directionalKeysState.south == true)
        {
            retVal.add(globalVals.DIR_SOUTH);
        }
        if (this.directionalKeysState.west == true)
        {
            retVal.add(globalVals.DIR_WEST);
        }
        return retVal;

    }

    
}
