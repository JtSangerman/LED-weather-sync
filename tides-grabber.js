require("dotenv").config();
var unirest = require("unirest");
var req = unirest("GET", "https://tides.p.rapidapi.com/tides");

const API_KEY = process.env.RAPID_API_KEY;
const LAT = process.env.LAT;
const LON = process.env.LON;
const RED_PIN_NO = process.env.RED_PIN_NO;
const GREEN_PIN_NO = process.env.GREEN_PIN_NO;
const BLUE_PIN_NO = process.env.BLUE_PIN_NO;

const get_tides_info = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      req.query({
        interval: "60",
        latitude: LAT,
        longitude: LON
      });

      req.headers({
        "x-rapidapi-host": "tides.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
        useQueryString: true
      });

      req.end(result => {
        //console.log(result);
        resolve(result.body);
      });
    } catch (err) {
      resolve(null);
      return null;
    }
  });
};

(async () => {
  let tides_info = await get_tides_info();
  let current_height_info = tides_info.heights[0];

  let [red, green, blue] = [0, 0, 0];

  let status = current_height_info.state;
  if (status == "RISING") {
    [red, green, blue] = [127, 127, 127];
  } else {
    [red, green, blue] = [30, 0, 127];
  }

  console.log("pigs p " + RED_PIN_NO + " " + red);
  console.log("pigs p " + GREEN_PIN_NO + " " + green);
  console.log("pigs p " + BLUE_PIN_NO + " " + blue);
})();
