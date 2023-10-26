
const { getStreamingLink } = require("./bypassLinkProtector.js");

(async () => {
    const res = await getStreamingLink("https://stayonline.pro/l/x024K/");
    console.log(res);
})();