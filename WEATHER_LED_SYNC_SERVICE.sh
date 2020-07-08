clear
sudo killall pigpiod
sudo pigpiod
echo "pigpiod started"

while true ;
do
	echo "Grabbing weather and deriving rgb values..."
	node --no-warnings weather-grabber.js > rgb_vals_temp
	bash < rgb_vals_temp
	echo "RGB values set:"
	cat rgb_vals_temp
	rm rgb_vals_temp
	sleep 5
done
