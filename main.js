

const { getFeed } = require('./rss.js');
const { getLinks } = require('./links.js');

(async () => {

    const siteLink = await getFeed();
    const linksfound = await getLinks(siteLink);

    for (let result of linksfound) {
        console.log(`${result.nome}:`);
        for (let link of result.links) {
            console.log(`\t${link.name} -> ${link.link}`);
        }
    }

    console.log('Digita qualsiasi tasto per uscire');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));

})();