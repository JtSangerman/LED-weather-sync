# LED-weather-sync
Code for Raspberry Pi project to sync LED lights to real-time weather data, pulled from the WeatherUnlocked api every 5s (adjustable). In this repository is a diagram the wiring config I used. Feel free to use your own, but do substitute all pin numbers with the correct ones. 

UPDATE: This project also has support for tide data, pulled from the RapidAPI's tide data service. Fill out appropriate tides API key in the .env file, along with the desired LAT and LON for configuration of this service.

LED strip: https://www.amazon.com/gp/product/B006LW2NJM/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1

Mosfets: https://www.amazon.com/gp/product/B071Z98SRG/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1 (comes with 5, uses 3)

Breadboard: https://www.amazon.com/gp/product/B01EV6LJ7G/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1 (comes with 3, uses 1)

Jumper wires: https://www.amazon.com/gp/product/B01LZF1ZSZ/ref=ppx_od_dt_b_asin_title_s00?ie=UTF8&psc=1 (comes with many, uses few)

Power supply: https://www.amazon.com/gp/product/B019Q3U72M/ref=ppx_od_dt_b_asin_title_s00?ie=UTF8&psc=1

Sign up for the free WeatherUnlocked api and receive your app key and app id.

Install node.js and npm on your pi. Verify installed correctly with:

	node -v
	npm -v
	
Run on your local proj directory, run:

	npm install

Fill out the appropriate .env file values.

Access your pi's unix/bash shell via ssh or directly.

Run the pi config script on your pi while in your project's directory to install pigpiod:

	chmod u+x pi-config.sh
	./pi-config.sh
	
Boot pigpiod (if you ever run into permission or 'already running' errors for setting pin values, run this script to reboot pigpiod):
	
	chmod u+x boot_pigpiod.sh
	./boot_pigpiod.sh
	
To test, I have included a script to set the lights to a desired RGB value. Run this script with `./set_lights.sh <red_rgb_val> <green_rgb_val> <blue_rgv_val>`. Ex) to test the lights, set them to all red:

	chmod u+x set_lights.sh
	./set_lights 255 0 0

Given all installation is correct, then began the LED weather sync service with:

	chmod u+x WEATHER_LED_SYNC_SERVICE.sh
	./WEATHER_LED_SYNC_SERVICE.sh

OR the tides LED sync service with:

	chmod u+x TIDES_LED_SYNC_SERVICE.sh
	./TIDES_LED_SYNC_SERVICE.sh
---------------

The weather grabber code is not done. The only thing left is to derive RGB values based off the current/forecasted weather conditions, which may be better to be implemented to one's own desires. Once I have decided on how to derive my RGB values, the repo will be updated.

The tide grabber code is also a work in process. At the moment, it will hue white for rising and blue for lowering. At some point, derivation of rgb values will be implemented for rate of tide change, low/high, HAT/LAT etc.

Feel free to mess with some other scripts in the repo. For example, for random strobe, run:

	chmod u+x disco_lights.sh
	./disco_lights.sh
	
To set a one time random rgb color:

	chmod u+x set_random.sh
	./set_random.sh
	
For police sirens:

	chmod u+x police_sirens.sh
	./police_sirens.sh

Shut lights off (all values to 0)

	chmod u+x lights_off.sh
	./lights_off.sh
	
You can use command `node rand-1to255.js` to generate a single random value [0,255] or `node random-rbg.js` for a full random rgb value. Pipe or input the output to your bash script appropriately.
