require("dotenv").config();
const http = require("http");

const APP_KEY = process.env.WEATHER_APP_KEY;
const APP_ID = process.env.WEATHER_APP_ID;

const ZIP_CODE = process.env.ZIP_CODE;

const RED_PIN_NO = process.env.RED_PIN_NO;
const GREEN_PIN_NO = process.env.GREEN_PIN_NO;
const BLUE_PIN_NO = process.env.BLUE_PIN_NO;

const FORECAST_URL =
  "http://api.weatherunlocked.com/api/forecast/us." +
  ZIP_CODE +
  "?app_id=" +
  APP_ID +
  "&app_key=" +
  APP_KEY;
const CURRENT_URL =
  "http://api.weatherunlocked.com/api/current/us." +
  ZIP_CODE +
  "?app_id=" +
  APP_ID +
  "&app_key=" +
  APP_KEY;

const get_current_weather = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await http
        .get(CURRENT_URL, response => {
          let data = "";

          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            resolve(JSON.parse(data));
          });
        })
        .on("error", err => {
          return null;
        });
    } catch (err) {
      return null;
    }
  });
};

const is_night = () => {
  // the lights can be intense at times in a dark room at night,
  // so we tone down the lights to be easier on the eyes
  // from 9pm to 8am
  let time = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  return time.getHours() >= 21 || time.getHours() <= 8;
};

const get_base_rgb_from_weather_code = wx_code => {
  const default_rgb = [127, 0, 0]; // red error color

  switch (true) {
    case wx_code == 0:
      return [255, 127, 0] // clear
    case wx_code >= 1 && wx_code <= 3:
      return [255, 0, 255]; // cloudy (no rain)
    case wx_code == 10 || wx_code == 45:
      return [125, 125, 125]; // mist, fog
    case (wx_code >= 21 && wx_code <= 29) ||
      (wx_code >= 50 && wx_code <= 65) ||
      (wx_code >= 80 && wx_code <= 82) ||
      wx_code == 91 ||
      wx_code == 92:
      return [0, 0, 255]; // rain
    case (wx_code >= 66 && wx_code <= 79) ||
      (wx_code >= 83 && wx_code <= 88) ||
      wx_code == 38 ||
      wx_code == 39 ||
      wx_code == 49 ||
      wx_code == 93 ||
      wx_code == 94:
      return [255, 255, 255]; // snow, freezing rain

    default:
      return default_rgb;
  }
};

(async () => {
  let weather = await get_current_weather();

  // sometimes the api will return clear skies when really its cloudy out. hack to fix:
  if (weather.wx_code == 0 && weather.cloudtotal_pct >= 10) {
    weather.wx_code = 1;
  }

  let [red, green, blue] = get_base_rgb_from_weather_code(weather.wx_code);

  if (is_night())
    [red, green, blue] = [Math.floor(red/2), Math.floor(green/2), Math.floor(blue/2)];

  console.log("pigs p " + RED_PIN_NO + " " + red);
  console.log("pigs p " + GREEN_PIN_NO + " " + green);
  console.log("pigs p " + BLUE_PIN_NO + " " + blue);
})();
