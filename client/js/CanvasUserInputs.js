//This class listens for inputs on the canvas element
//This class should set flags to be used by the gameloop
"use strict"
function CanvasUserInputs()
{

	canvas = document.getElementById('cvs');
    //this.canvas.addEventListener('mousemove', this.gameInput, false);
    //this.canvas.addEventListener('mouseout', this.outOfBounds, false);

    var directionalKeysState = { 
        north: false,
        east: false,
        south: false,
        west: false,
    }


    canvas.addEventListener('keydown', function(event)
    {

        if (globalVals.KEY_LEFT == event.keyCode)
        {
            directionalKeysState.west = true;
        }
        else if (globalVals.KEY_UP == event.keyCode)
        {
            directionalKeysState.north = true;
        } 
        else if (globalVals.KEY_RIGHT == event.keyCode)
        {
            directionalKeysState.east = true;
        }
        else if (globalVals.KEY_DOWN == event.keyCode)
        {
            directionalKeysState.south = true;
        }

        
    }, false);
    canvas.addEventListener('keyup', function(event)
    {

        if (globalVals.KEY_LEFT == event.keyCode)
        {
            directionalKeysState.west = false;
        }
        else if (globalVals.KEY_UP == event.keyCode)
        {
            directionalKeysState.north = false;
        } 
        else if (globalVals.KEY_RIGHT == event.keyCode)
        {
            directionalKeysState.east = false;
        }
        else if (globalVals.KEY_DOWN == event.keyCode)
        {
            directionalKeysState.south = false;
        }

        
    }, false);

    this.getMovementDirection = function()
    {
        var retVal = new Vector(0,0);
        if (directionalKeysState.north == true)
        {
            retVal.add(globalVals.DIR_NORTH);
        }
        if (directionalKeysState.east == true)
        {
            retVal.add(globalVals.DIR_EAST);
        }
        if (directionalKeysState.south == true)
        {
            retVal.add(globalVals.DIR_SOUTH);
        }
        if (directionalKeysState.west == true)
        {
            retVal.add(globalVals.DIR_WEST);
        }
        return retVal;

    }

    
}
