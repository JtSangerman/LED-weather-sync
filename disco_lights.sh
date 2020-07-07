clear
sudo killall pigpiod
sudo pigpiod
echo "pigpiod started"

while true ;
do
	rbg=$(node --no-warnings random-rgb.js)
	echo "setting to $rbg"
	./set_lights.sh $rbg
done
