//updating doc-scaper.config.json to use environment variables during run time
const fs = require('fs');
const fileName = './doc-scaper.config.json';
const file = require(fileName);

if (file && file.cred && file.cred.appid)
    file.cred.appid = process.env.PACTFLOW_ALGOLIA_APPID || "LY8MHW6MWQ";

if (file && file.cred && file.cred.apikey)
    file.cred.apikey = process.env.PACTFLOW_ALGOLIA_KEY || "";

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err)
        return console.log(err);
    console.log('updated doc-scaper.config.json');
});