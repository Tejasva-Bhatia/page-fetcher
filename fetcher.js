const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

if (args.length !== 2) {
  console.error('Enter 2 arguments only');
  process.exit(1);
}

const targetUrl = args[0];
const localFilePath = args[1];

request(targetUrl, (error, response, body) => {
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);

  fs.writeFile(localFilePath, body, (writeError) => {
    if (writeError) {
      console.error("Error");
      process.exit(1);
    }

    // Get the size of the downloaded content
    const fileSize = Buffer.byteLength(body, 'utf8');

    // Print success message
    console.log(`Downloaded and saved ${fileSize} bytes to ${localFilePath}`);
  });

});