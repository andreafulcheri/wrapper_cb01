const axios = require("axios");
const cheerio = require('cheerio');
const inquirer = require('inquirer');
const prompt = require("prompt-sync")({ sigint: true });
const Parser = require('rss-parser');
const parser = new Parser();

(async () => {

    const siteLink = (await parser.parseURL('https://feeds.feedburner.com/cineblog01/Film-In-Streaming-Gratis')).link;

    var list = [];
    var risultati = 0;
    var pagine = 0;
    var index = 1;

    console.log('L\'attuale indirizzo è', siteLink, '\n');

    do {
        var ricerca = prompt("Inserisci il film da cercare -> ");

        var response = await axios.get(siteLink + "/page/" + index + "/?s=" + ricerca);
        var siteHTML = response.data;
        var $ = cheerio.load(siteHTML);

        $('div[class=sequex-page-title]').find('div > h1 > span').each(function (index, element) {
            risultati = Number(element.children[0].data.trim());
            pagine = Math.ceil(risultati / 12);
            console.log("\nRisultati: ", risultati, ' pagine: ', pagine);
        });

        if(risultati == 0){
            console.log("Nessun risultato\n");
        }

    } while (risultati == 0)

    while (index <= pagine) {
        $('div[class=sequex-one-columns]').find('div > div > div > a').each(function (index, element) {
            list.push($(element).attr('href'));
        });
        index++;
    }

    //TODO implementare ricerca serie tv 

    const scelta = await inquirer.prompt([
        {
            type: 'list',
            name: 'film',
            message: 'Scegli un film',
            choices: list,
        },
    ]);

    console.info('Hai scelto: ', scelta.film);

    response = await axios.get(scelta.film);
    siteHTML = response.data;
    $ = cheerio.load(siteHTML);

    var list2 = [];

    $('table[class=cbtable]').find('tbody > tr > td > a').each(function (index, element) {
        list2.push({ link: $(element).attr('href'), nome: $(element).contents().first().text() });
    });

    console.log("🚀 ", list2);

    console.log('Digita qualsiasi tasto per uscire');

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));

})();