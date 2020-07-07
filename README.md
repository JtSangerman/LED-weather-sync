# LED-weather-sync
Code for Raspberry Pi project to sync LED lights to real-time weather data, pulled from the WeatherUnlocked api. In this repository is the wiring config I used. Feel free to use your own, but do substitute all pin numbers with the correct ones.

Sign up for the free WeatherUnlocked api and receive your app key and app id.

Fill out the appropriate .env file values.

Access your pi's unix/bash shell via ssh or directly.

Run the pi config script on your pi while in your project's directory to install pigpiod:
	chmod u+x pi-config.sh
	./pi-config.sh

Given all installation is correct, then began the LED weather sync service with:
	chmod u+x LED_service.sh
	./LED_service.sh