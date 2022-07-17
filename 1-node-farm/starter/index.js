const fs = require("fs");
const http = require("http");
const url = require("url");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

///////////////////////////////
///// FILES ///////////////

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is text: ${textIn}\n Created on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//     if (err) return console.log("Error occured");
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/input.txt`, "utf-8", (err, data3) => {
//             console.log(data3);
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, err => {
//                 console.log("Files has been written😊");
//             });
//         });
//     });
// });
// console.log("Will read this !");

////////////////////////////
///// SERVER ///////////////

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardsHtml = dataObj
            .map(el => replaceTemplate(tempCard, el))
            .join("");
        const output = tempOverview.replace("{%PRODUCTCARD%}", cardsHtml);
        res.end(output);
    } else if (pathname === "/product") {
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    } else if (pathname === "/api") {
        res.writeHead(200, {
            "Content-type": "application/json",
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world",
        });
        res.end("<h2>Page not found<h2/>");
    }
});

server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to request...");
});
