var express = require("express");
var cors = require("cors");
var analyzer = require("./helper/analyzer");

var app = new express();

// allow cross origin
app.use(cors());

/**
 * gets data by Wappalizer library
 *
 * @return {Object} - returns site specific information. Urls, technologies etc. about searched url
 */
app.get("/api", async (req, res, next) => {
    if (req.query.url != undefined) {
        const searchUrl = req.query.url;

        const re =
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&=]*)/;

        const regex = new RegExp(re);

        if (regex.test(searchUrl)) {
            console.log("Requested url:", searchUrl);
            var result = await analyzer.analyze(searchUrl);

            if (result.technologies.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(400).json(result);
            }
        } else {
            res.status(404).json({});
        }
    } else {
        res.status(404).json({});
    }
});

app.listen(3001, () => {
    console.log("app is running...");
});
