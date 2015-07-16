function s2anim(id) {
	var _target = document.getElementById(id);

	if(_target == null)
		throw "Target ID is invalid";
	
	var _commandList = [],
		_delayList = [],
		_currentCommand = "",
		_delay = null;

	_target.addEventListener('animationend', nextCommand, false);


	this.add = function(name, delay)
	{
		if(isNaN(delay))
			throw delay + " is invalid";
		_commandList.push(name);
		_delayList.push(delay);
		return this;
	}

	this.start = function()
	{
		nextCommand();
	}

	function switchTransition()
	{
		_target.setAttribute("class", _target.className += " " + _currentCommand);
	}

	function nextCommand(event)
	{
		if(_commandList.length != 0) {
			_currentCommand = _commandList.shift();
			var time = _delayList.shift() * 1000;
			setTimeout(switchTransition, time)
		}
	}
}





