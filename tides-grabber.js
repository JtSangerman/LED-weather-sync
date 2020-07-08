require("dotenv").config();
const http = require("http");

const API_KEY = process.env.TIDES_API_KEY;

const TIDES_URL = "http://www.worldtides.info/api/v2";
const get_tides_info = async () => {
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

const get_high_and_low = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await http
        .get(FORECAST_URL, response => {
          let data = "";

          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            let forecast = JSON.parse(data);
            let today = forecast.Days[0];
            resolve([today.temp_min_f, today.temp_max_f]);
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

const get_red_value = () => {
  return 255;
};

const get_blue_value = () => {
  return 255;
};

const get_green_value = () => {
  return 255;
};

(async () => {
  let weather = await get_current_weather();
  let [low, high] = await get_high_and_low();

  let red = get_red_value();
  let green = get_green_value();
  let blue = get_blue_value();

  console.log("pigs p " + RED_PIN_NO + " " + red);
  console.log("pigs p " + GREEN_PIN_NO + " " + green);
  console.log("pigs p " + BLUE_PIN_NO + " " + blue);
})();
