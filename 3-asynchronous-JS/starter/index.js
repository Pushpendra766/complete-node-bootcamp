const fs = require("fs");
const superagent = require("superagent");
const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject("File not found!");
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) return reject("Could not write data.");
            resolve("Success");
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        // const res = await superagent.get(
        //     `https://dog.ceo/api/breed/${data}/images/random`
        // );
        const res1Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );

        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(img => img.body.message);
        console.log(imgs);
        // console.log(res.body);
        await writeFilePro("new-dog.txt", imgs.join("\n"));
        console.log("Random dog image url saved to file.");
    } catch (err) {
        console.log(err);
        throw err;
    }
    return "2: Dog pic is here";
};

(async () => {
    try {
        console.log("1: Will get dog pic");
        const x = await getDogPic();
        console.log(x);
        console.log("3: done getting dog pic");
    } catch (err) {
        console.log("Error!!!");
    }
})();
/*
console.log("1: Will get dog pic");
getDogPic()
    .then(x => {
        console.log(x);
        console.log("3: done getting dog pic");
    })
    .catch(err => {
        console.log("Eoorr");
    });
*/

// readFilePro(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(
//             `https://dog.ceo/api/breed/${data}/images/random`
//         );
//     })
//     .then(res => {
//         console.log(res.body);
//         return writeFilePro("new-dog.txt", res.body.message);
//     })
//     .then(() => console.log("Random dog image url saved to file."))
//     .catch(err => {
//         console.log(err);
//     });
