import http from 'k6/http';
import { sleep, check } from 'k6';

const accessToken = "get jwt from UI and paste here"
const query = `
 {
  findMyWorkQueuePage(
    page: {
      pageSize: 10
    }
  ) {
    totalRecords
  }
}`;

const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
}

export const options = {
  discardResponseBodies: true,
  scenarios: {
    tablerow: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '30s',
    }
  }
}
export default function () {
  //http.get('https://test.k6.io');



  const res = http.post('http://localhost:8080/api/graphql', JSON.stringify({query: query}), {headers: headers})
  check(res, {'is status 200': (r) => console.log(r.status)})
  sleep(0.5);
}
