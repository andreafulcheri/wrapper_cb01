const Downloader = require("nodejs-file-downloader");
const ProgressBar = require('progress');

async function downloader(link) {
    var bar;
    const downloader = new Downloader({
        url: link,
        directory: "./downloads", 
        maxAttempts: 3,
        cloneFiles: false,
        onProgress: function (percentage, chunk, remainingSize) {
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

exports.downloader = downloader;