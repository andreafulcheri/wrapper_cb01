const Downloader = require("nodejs-file-downloader");
const ProgressBar = require('progress');


async function downloader(link) {
    const link = link;
    var bar;
    const downloader = new Downloader({
        url: "https://s-delivery29.mxdcontent.net/d/gnvgxpn4fjew4x/o1fbhacsi6iltpdxd109rm9fx?ab=0&r=https%3A%2F%2Fmixdrop.club%2F",
        directory: "./downloads", 
        maxAttempts: 3,
        cloneFiles: false,
        onProgress: function (percentage, chunk, remainingSize) {
            //Gets called with each chunk.
            /* console.log("% ", percentage);
            console.log("Remaining bytes: ", remainingSize); */
            bar.tick(chunk.length/1000);
            
        },
        onResponse: function (response){
            var len = parseInt(response.headers['content-length']/1000, 10);
            bar = new ProgressBar('  :percent [:bar] :rate/kbps :etas', {
                complete: '=',
                incomplete: ' ',
                width: 30,
                total: len
            });
        }
    });

    


    try {
        await downloader.download();
    } catch (error) {
        console.log(error);
    }
};