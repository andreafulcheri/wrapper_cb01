const { getFeed } = require('./lib/cb01/rss.js');

(async () => {

    const siteLink = await getFeed();

})();
