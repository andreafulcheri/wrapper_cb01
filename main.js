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
    var risultatiSerieTV = 0;
    var pagine = 0;
    var pagineSerieTV = 0;
    var index = 1;
    var indexSerieTV = 1;

    console.log('L\'attuale indirizzo è', siteLink, '\n');

    do {
        var ricerca = prompt("Inserisci il film o la serie tv da cercare -> ");

        var $ = cheerio.load((await axios.get(`${siteLink}/page/${index}/?s=${ricerca}`)).data);

        $('div[class=sequex-page-title]').find('div > h1 > span').each(function (index, element) {
            risultati = Number(element.children[0].data.trim());
            pagine = Math.ceil(risultati / 12);
            console.log("\nRisultati: ", risultati, ' pagine: ', pagine);
        });

        var $2 = cheerio.load((await axios.get(`${siteLink}/serietv/page/${indexSerieTV}/?s=${ricerca}`)).data);

        $2('div[class=sequex-page-title]').find('div > h1 > span').each(function (index, element) {
            risultatiSerieTV = Number(element.children[0].data.trim());
            pagineSerieTV = Math.ceil(risultatiSerieTV / 12);
            console.log("Risultati Serie TV: ", risultatiSerieTV, ' pagine: ', pagineSerieTV + '\n');
        });

        if ((risultati + risultatiSerieTV) === 0) {
            console.log("Nessun risultato\n");
        }

    } while ((risultati + risultatiSerieTV) === 0)

    while (index <= pagine) {
        $('div[class=sequex-one-columns]').find('div > div > div > a').each(function (index, element) {
            list.push($(element).attr('href'));
        });
        index++;
    }

    while (indexSerieTV <= pagineSerieTV) {
        $2('div[class=sequex-one-columns]').find('div > div > div > a').each(function (index, element) {
            list.push($(element).attr('href'));
        });
        indexSerieTV++;
    }

    const scelta = await inquirer.prompt([
        {
            type: 'list',
            name: 'risultato',
            message: 'Scegli un risultato',
            choices: list
        },
    ]);

    console.info('Hai scelto: ', scelta.risultato);

    var siteHTML = (await axios.get(scelta.risultato)).data;
    $ = cheerio.load(siteHTML);
    $2 = cheerio.load(siteHTML);

    var list2 = [];

    //film
    $('table[class=cbtable]').find('tbody > tr > td > a').each(function (index, element) {
        list2.push({ links: [{ link: $(element).attr('href'), name: "" }], nome: $(element).contents().first().text() });
    });

    //serietv
    $2('table[class=cbtable]').find('tbody > tr > td > div > div > strong > p').each(function (index, element) {
        let nome = $2(element).contents().first().text().slice(0, -3);
        let links = [];
        for (var child of element.children) {
            if (child.name === 'a') {
                let name = child.firstChild.data;
                links.push({ name, link: $2(child).attr('href') });
            }
        }
        list2.push({ links, nome });
    });

    for (let result of list2) {
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