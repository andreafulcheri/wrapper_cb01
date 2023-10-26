var Parser = require('rss-parser');
var parser = new Parser();

async function getFeed() {
  var feed = await parser.parseURL('https://feeds.feedburner.com/cineblog01/Film-In-Streaming-Gratis');
  console.log("Il link aggiornato è: " + feed.link);
  return feed.link;
}

exports.getFeed = getFeed;

//getFeed();