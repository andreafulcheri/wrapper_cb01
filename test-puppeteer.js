
var Spinner = require('cli-spinner').Spinner;

const { getStreamingLink } = require("./bypassLinkProtector.js");

(async () => {
    var spinner = new Spinner('processing.. %s');
    spinner.setSpinnerString(19);
    spinner.start();
    const res = await getStreamingLink("https://stayonline.pro/l/x024K/");
    spinner.stop(true);
    console.log(res);
})();