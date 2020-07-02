require("dotenv").config();

const APP_KEY = process.env.APP_KEY;
const APP_ID = process.env.APP_ID;

const get_weather = async () => {
  const http = require("http");
  try {
    await http
      .get(
        "http://api.weatherunlocked.com/api/current/us.97110?" +
          "app_id=" +
          APP_ID +
          "&app_key=" +
          APP_KEY,
        response => {
          let data = "";

          response.on("data", chunk => {
            data += chunk;
          });

          response.on("end", () => {
            console.log(
              "Request successfully carried out to: GET http://api.weatherunlocked.com/api/current/us.97110?" +
                "app_id=" +
                APP_ID +
                "&app_key=" +
                APP_KEY
            );
            var weather = JSON.parse(data);

            console.log("--------------------------------");
            console.log("Temp is " + weather.temp_f + " degrees F");
            console.log("Conditions are described as " + weather.wx_desc);
            console.log("Cloud coverage is at " + weather.cloudtotal_pct + "%");
            console.log(
              "Wind speed is " +
                weather.windspd_mph +
                " mph from the " +
                weather.winddir_compass
            );
            console.log("Visibility is at " + weather.vis_mi + " miles");
            console.log("--------------------------------\n\n");
          });
        }
      )
      .on("error", err => {
        console.log("Ran into an error on the https request: ");
        console.log(err);
      });
  } catch (err) {
    console.log("Unchecked error caught: ");
    console.log(err);
  }
};

console.clear();
console.log("Begginning weather grabber\n\n");

(async () => {
  await get_weather();
})();

setInterval(async () => {
  await get_weather();
}, 5000);
