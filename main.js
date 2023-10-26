

const { getFeed } = require('./rss.js');
const { getLinks } = require('./links.js');
const inquirer  = require('inquirer');
const { Separator } = require('inquirer');
const { getStreamingLink } = require("./bypassLinkProtector.js");

(async () => {

    const siteLink = await getFeed();
    const linksfound = await getLinks(siteLink);

    var linkDaRisolvere = [];

    if(Array.isArray(linksfound[0].value)){
        const scelta = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'risultato',
                message: 'Scegli puntate',
                choices: linksfound,
                loop: false
            },
        ]);
        var linksScelti = [];
        scelta.risultato.forEach(element => {
            linksScelti.push(...element);
            linksScelti.push(new Separator())
        });
        linksScelti.pop();

        const scelta2 = await inquirer.prompt([
            {
                type: 'checkbox',
                name: 'risultato',
                message: 'Scegli link puntate',
                choices: linksScelti,
                loop: false
            },
        ]);
        console.log(scelta2.risultato);
        linkDaRisolvere = scelta2.risultato;

    }else{
        const scelta = await inquirer.prompt([
            {
                type: 'list',
                name: 'risultato',
                message: 'Scegli link',
                choices: linksfound,
                loop: false
            },
        ]);
        console.log(scelta.risultato);
        linkDaRisolvere.push(scelta.risultato);
    }

    console.log("inizio risoluzione link");
    for (var link of linkDaRisolvere) {
        var linkRisolto = await getStreamingLink(link); // da try catch e implementare gestione link multipli
        console.log(linkRisolto);
    }


    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));

})();