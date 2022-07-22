const fs = require("fs");

setTimeout(() => {
    console.log("In timeout");
}, 0);
setImmediate(() => {
    console.log("In setimmediate");
});

fs.readFile("test-file.txt", "utf-8", () => {
    console.log("In I/O");
    console.log("_-_-_-_-_-_-_-_");
    setTimeout(() => {
        console.log("In timeout 2");
    }, 0);
    setTimeout(() => {
        console.log("In timeout 3 ");
    }, 3000);
    setImmediate(() => {
        console.log("In setimmediate 2");
    });

    process.nextTick(() => {
        console.log("Next tick process");
    });
});

console.log("Top level code");
