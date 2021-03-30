import http from 'k6/http';
import { sleep } from 'k6';
export default function () {
  http.get('localhost:5000/qa/questions?product_id=14931');
  sleep(1);
}