clear
sudo killall pigpiod
sudo pigpiod
echo "pigpiod started"

while true ;
do
	./set_lights.sh 255 0 0
	echo "red"
	sleep .1
	./set_lights.sh 0 0 255
	echo "blue"
	sleep .1
done
