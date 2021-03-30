const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('', {encoding: 'utf8'}, {start: 1}),
    output: fs.createWriteStream('', {encoding: 'utf8'}),
    crlfDelay: Infinity
});

const count = 0;

// const columns = [
//     ''
// ]

rl.on('line', (line) => {

    // a row is an array of values separated by commas
    const row = line.split(',');

    // if it's missing a field
    if (row.length !== 8) return;

    // if question id is missing
    if (isNaN(row[0])) return;

    // if product id is missing
    if (isNaN(row[1])) return;

    // if q body is empty or exceeds max limit
    if (row[2].length <=0 || row[2] > 400) return;

    // if date is missing
    if (!row[3]) return;

    // if name is missing or exceeds max limit
    if (row[4].length <=0 || row[3] > 30) return;

    // if email is missing or exceeds max limit
    if (row[5].length <= 0 || row[4] > 60) return;

    // if helpfulness data is missing
    if (row[6] <0) return;

    // if reported data is missing
    if (row[7] < 0) return;

    count++;

    rl.output.write(`${line} \n`);

})