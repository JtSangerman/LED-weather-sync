rgb=$(node --no-warnings random-rgb.js)
echo "setting to $rgb"
./set_lights.sh $rgb
