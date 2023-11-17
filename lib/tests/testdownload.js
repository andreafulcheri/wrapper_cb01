
const { downloader } = require("../utils/downloader");

(async () => {

    const linki = "https://vixcloud.at/embed/63022?token=6d3ed1af4060d6d9b9988c57a0b64f66&title=Iron+Man+3&referer=1&expires=1704837622"
    await downloader(linki);

})();