function s2anim(id) {
	var _target = document.getElementById(id);

	if(_target == null)
		throw "Target ID is invalid";
	
	var _commandList = [];
	addListener(_target, nextCommand);

	this.add = function(name)
	{
		_commandList.push(name);
		return this;
	}

	this.start = function()
	{
		nextCommand();
	}

	function nextCommand(event)
	{
		if(_commandList.length != 0) {
			_target.setAttribute("class", _target.className += " " + _commandList.shift())
		}
	}

	function addListener(element, func)
	{
		var events=['animationend','webkitAnimationEnd','oanimationend','MSAnimationEnd'];
		for(var i in events) {
			element.addEventListener(events[i], func, false);
		}
	}
}



		