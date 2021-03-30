// const fs = require('fs');
// const parse = require('csv-parser');
// const filepath = './'

// const csvData = [];

// fs.createReadStream(filepath)
// // error
// .pipe(csv())
// .on('data', (data) => {
//     csvData.push(data)
// })
// .on('end', () => {
//     csvData.shift();
//     console.log(csvData);
//     console.log('CSV file successfully processed');
// })

// // class Question {
// //     constructor(question_id, product_id, body, date, name, email, helpfulness, reported) {
// //         this.question_id = question_id;
// //         this.product_id = product_id;
// //         this.body = body;
// //         this.date = date;
// //         this.name = name;
// //         this.email = email;
// //         this.helpfulness = helpfulness;
// //         this.reported = reported;
// //     }
// // }

// // const processData = (err, data) => {
// //     if (err) {
// //         console.log(`An error was encountered: ${err}`);
// //         return;
// //     }
// //     data.shift();
// //     const userList = data.map(row => new userList(...row));
// //     analyseUsers(userList);
// // }