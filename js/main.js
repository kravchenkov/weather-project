(function() {
	getWeatherData();

	function getWeatherData() {
		navigator.geolocation.getCurrentPosition(locSuccess, locError);

		function locSuccess(position) {
			$.getJSON(
				'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +
				position.coords.longitude + '&units=metric&APPID=98aff8e24614d58fb17819e74288f9a3' + '&lang=uk' + '&callback=?',
				function(data) {

					setPageData(data);

				});

			$.getJSON(
				'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' +
				position.coords.longitude + '&units=metric&APPID=98aff8e24614d58fb17819e74288f9a3' + '&lang=uk' + '&callback=?',
				function(data) {

					setCurrentWeather(data);

				});


		}

		function locError() {
			var defCity = "Lviv";
			getWeatherByCity16('ua', defCity);
		}
	}



	function getWeatherByCity16(lang, city) {
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +
			'&units=metric&cnt=7&appid=98aff8e24614d58fb17819e74288f9a3&lang=' + lang + '&callback=?',

			function(data) {

				setPageData(data);


			});

		$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city +
			'&units=metric&cnt=7&appid=98aff8e24614d58fb17819e74288f9a3&lang=' + lang + '&callback=?',

			function(data) {


				setCurrentWeather(data);


			});
	}

	function setPageData(data) {
		$('#city').text(data.city.name);
		$('#country').text(data.city.name + "," + data.city.country);

		var weatherArray = (function() {
			var array = [];
			for (var i = 0; i < 7; i++) {
				array.push([Math.round(data.list[i].temp.day), Math.round(data.list[i].temp.night)]);
			}

			return array;
		})();

		weatherWidget.init(weatherArray);


		//Set main data



		$('#iconmonday').html('<img src="images/icons/' + data.list[0].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconthuesday').html('<img src="images/icons/' + data.list[1].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconwednesday').html('<img src="images/icons/' + data.list[2].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconthursday').html('<img src="images/icons/' + data.list[3].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconfriday').html('<img src="images/icons/' + data.list[4].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconsaturday').html('<img src="images/icons/' + data.list[5].weather[0].icon + '.png" alt="Weather icon">');
		$('#iconsunday').html('<img src="images/icons/' + data.list[6].weather[0].icon + '.png" alt="Weather icon">');



	}

	function setCurrentWeather(data) {
		var curTemp = Math.round(data.main.temp);
		var windSpeed = data.wind.speed;
		var feelsLike = Math.round(curTemp - windSpeed * 0.3);
		$('#current-temp').text(curTemp);
		$('#feels-like-temp').text(feelsLike);
	}

	//Events

	$('#btnGetWeather16').click(function() {
		getWeatherByCity16('ua', $('#search').val());
	});


	$('#search').keypress(function(e) {
		var ENTER_KEY_CODE = 13;
		if (e.which === ENTER_KEY_CODE) {
			$('#btnGetWeather16').trigger('click');
			return false;
		}
	});


	//Click on search button

	$('.search-button').on('click', function() {
		$('#sb-search').toggleClass('hidden');

	});

	$(document).on('click', function(event) {
		if (!$(event.target).closest('.simple').length) {
			if (!$('#sb-search').hasClass('hidden')) {
				$('#sb-search').addClass('hidden');
			}
		}
	});

}());