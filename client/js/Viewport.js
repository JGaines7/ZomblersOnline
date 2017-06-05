function Viewport()
{
	//Position TopLeft
	var position = new Vector(0,0);
	this.getPosition = function() {return position;}
	this.setPosition = function(pos) { position = pos;}

	var dimensions = new Vector(0,0);
	this.getDimensions = function(){return dimensions;}
	this.setDimensions = function(dim) { dimensions = dim; console.log("Set dimesions to : " + dimensions.x);}
	
	this.setCenterPosition = function(pos)
	{
		//Need center position subtracted by half of the size
		position = Vector.subtract(pos, Vector.multiply(new Vector(dimensions.x, dimensions.y), 0.5))
	}

	//return a gameworld postion translated to a viewport position
	this.getViewOffset = function(x,y)
	{
		return Vector.subtract(new Vector(x,y), position);
	}
	this.getViewOffsetFromVec = function(pos)
	{
		return Vector.subtract(pos, position);
	}

	this.isInView = function(testPos)
	{
		//basic check, if object is within 50 tiles of view, just draw it. (assuming all objects < 50 radius)

		var cullDist = 50;

		if(testPos.x > position.x - cullDist && testPos.x < position.x + dimensions.x + cullDist
		&& testPos.y > position.y - cullDist && testPos.y < position.y + dimensions.y + cullDist)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


}
