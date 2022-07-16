const fs = require("fs");
const http = require("http");

////////////////////////////
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

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if (pathName === "/" || pathName === "/overview") {
        res.end("This is overview!");
    } else if (pathName === "/product") {
        res.end("This is product");
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
