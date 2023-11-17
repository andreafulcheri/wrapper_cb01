const axios = require("axios");
const cheerio = require('cheerio');
const inquirer = require('inquirer');
const prompt = require("prompt-sync")({ sigint: true });

async function getLinks() {

    var list = [];
    var risultati = 0;

    do {
        var ricerca = prompt("Inserisci il film o la serie tv da cercare -> ");

        var $ = cheerio.load((await axios.get(`https://streamingcommunity.at/search?q=${ricerca}`)).data);

        $('#scroll-region > div > div:nth-child(1) > div > div > div').find('a').each(function (index, element) {
            //risultati = Number(element.children[0].data.trim());
            console.log("\nRisultati: ", element);
        });

        if (risultati === 0) {
            console.log("Nessun risultato\n");
        }

    } while (risultati === 0)

    const scelta = await inquirer.prompt([
        {
            type: 'list',
            name: 'risultato',
            message: 'Scegli un risultato',
            choices: list
        },
    ]);

    console.info('Hai scelto: ', scelta.risultato);

    return list2;
}

exports.getLinks = getLinks;