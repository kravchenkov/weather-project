(function() {

	//Options
	var pixelsPerDegree = 8; //Pixels height for 1 degree Celius by default
	var animationTimeout = 180; //Timeout between each bar animation
	var widgetClassName = "weather-content-block"; //Widget class name

	//Get widget bar elements and transform nodelist to array
	var bars = [].slice.call(document.querySelector('.' + widgetClassName).querySelectorAll('.weather-day'));

	//Setting values

	function setValues(weatherData) {
		//For each day bar...
		for (var i = 0, l = bars.length; i < l; i++) {

			//Getting indicators and count placeholders
			var bar = bars[i].querySelector('.weather-indicator');
			var daylyTemp = bars[i].querySelector('.dayly');
			var nigthlyTemp = bars[i].querySelector('.nightly');

			//Setting counters data
			daylyTemp.innerHTML = weatherData[i][0];
			nigthlyTemp.innerHTML = weatherData[i][1];

			//Calc bar height and set it
			var tempDelta = Math.abs(weatherData[i][0] - weatherData[i][1]);
			tempDelta = tempDelta < 1 ? 1 : tempDelta;
			var height = tempDelta * pixelsPerDegree;
			if (height > 160) {height = 160;}
			bar.style.height = height + 'px';


			//Setting timeout callbacks to animate bars
			setTimeout(function(bar, daylyTemp, nigthlyTemp) {

				//Remove css classes of un-inited state
				bar.classList.remove('nulled');
				daylyTemp.classList.remove('invis');
				nigthlyTemp.classList.remove('invis');

			}, animationTimeout * i, bar, daylyTemp, nigthlyTemp);
		}
	}

	//Init widget
	function init(weather) {
		//If no argument or data contains not 7 days - break
		if (weather && weather.length == 7) {
			calcPixelRatio(weather);
			setValues(weather);
		}
	}

	function calcPixelRatio(weather) {
		var maxDelta, minDelta;
		maxDelta = minDelta = Math.abs(weather[0][0] - weather[0][1]);

		for (i = 0; i < weather.length; i++) {
			var curDelta = Math.abs(weather[i][0] - weather[i][1]);
			if (maxDelta < curDelta) {
				maxDelta = curDelta;
			}
			if (minDelta > curDelta) {
				minDelta = curDelta;
			}

		}

		var avDelta = Math.round((maxDelta + minDelta) / 2);

		if (minDelta < 3 && maxDelta < 6) {
			pixelsPerDegree = avDelta * (maxDelta + 4) + 2;
		}

		if (minDelta < 3 && maxDelta > 6) {
			pixelsPerDegree = avDelta * (minDelta + 3) + 1;
		}


		if (maxDelta > 8) {
			pixelsPerDegree = avDelta * 2;
		}

	}

	//Export globals
	window.weatherWidget = new Object();
	window.weatherWidget.init = init;



}());