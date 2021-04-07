import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    stages: [
        // { duration: '5s', target: 50 },
        // { duration: '30s', target: 100, },
        // { duration: '1m30s', target: 500 },
        // { duration: '1m', target:  250 },
        // { duration: '20s', target: 0 }
        { duration: '1s', target: 1 },
        { duration: '1s', target: 10, },
        { duration: '20s', target: 100 }
        // { duration: '20s', target: 1000 }
    ]
}

export default function () {
    let randomProductId = Math.floor(Math.random() * 100000);
    let res = http.get(`http://localhost:5000/qa/questions?product_id=${randomProductId}`);
    check(res, { 'Status 201': (r) => r.status === 200 });
    sleep(1);
}