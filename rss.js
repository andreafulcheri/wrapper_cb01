let Parser = require('rss-parser');
let parser = new Parser();

(async () => {

  let feed = await parser.parseURL('https://feeds.feedburner.com/cineblog01/Film-In-Streaming-Gratis');
  console.log(feed);
})();