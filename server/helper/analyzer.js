const Wappalyzer = require("wappalyzer");

/**
 * helper function to retrieve data for given url
 *
 * @param {String} url
 * @return {Object} - returns page specific information
 */
async function analyze(url) {
    const wappalyzer = new Wappalyzer({
        delay: 0,
        maxWait: 30000,
    });

    let result = {};

    try {
        let urls = null;
        let technologies = [];
        let pages = 0;

        await wappalyzer.init();

        const site = await wappalyzer.open(url);

        // Optionally capture and output errors
        site.on("error", (err) => {
            console.log(err.message);
        });

        const results = await site.analyze();

        // urls assignment
        urls = Object.keys(results.urls);

        // pages assignment
        pages = urls.length;

        // technologies assignment
        technologies = results.technologies.map((r) => r.name, []);

        result = {
            pages: pages,
            urls: urls,
            technologies: technologies,
        };
    } catch (error) {
        console.log(error.message);
    }

    await wappalyzer.destroy();

    return result;
}

module.exports.analyze = analyze;
