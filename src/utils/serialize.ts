const fs = require('fs');

export default function (service: string) {
  try {
    const fileData = fs.readFileSync(`./src/static/json/${service}.json`, 'utf-8');
    const jsonParse = JSON.parse(fileData);

    return jsonParse;
  } catch (err) {
    console.log(err);
  }
}
