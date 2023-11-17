// get http request from https://stayonline.pro/l/x024K/
 //make http request to https://stayonline.pro/l/x024K/

 ( async () => {
    //make http request to https://stayonline.pro/l/x024K/
    const http = require('http');
    const url = require('url');
    const fs = require('fs');

    http.get('http://stayonline.pro/l/x024K/', (res) => {

        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}`);
        } else if (!/^text\/html/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                            `Expected text/html but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });

        res.on('end', () => {
            try {
                const parsedData = rawData;
                console.log(parsedData);
                fs.writeFile("index.html", parsedData, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                }); 
            } catch (e) {
                console.error(e.message);
            }
        });
    });
})();
