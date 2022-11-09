import http from 'k6/http';
import { sleep, check, group } from 'k6';

export const options = {
  duration: '100s',
  rps: 1000
};

const getQs = `http://localhost:3001/qa/questions?product_id=${Math.ceil(Math.random() *1000000)}&page=1&count=${Math.ceil(Math.random() * 30)}`;
const getAs = `http://localhost:3001/qa/questions/${Math.ceil(Math.random() *3000000)}/answers?page=1&count=${Math.ceil(Math.random() * 30)}`;
const addQ = `http://localhost:3001/qa/questions`;
const addA = `http://localhost:3001/qa/questions/${Math.ceil(Math.random() *3000000)}/answers`;
const Qhelp = `http://localhost:3001/qa/questions/${Math.ceil(Math.random() *3000000)}/helpful`;
const Qreport = `http://localhost:3001/qa/questions/${Math.ceil(Math.random() *3000000)}/report`;
const Ahelp = `http://localhost:3001/qa/answers/${Math.ceil(Math.random() *6000000)}/helpful`;
const Areport = `http://localhost:3001/qa/answers/${Math.ceil(Math.random() *6000000)}/report`;

export default function test() {
  group('getQs', () => {
    const getQsResp = http.get(getQs);
    check(getQsResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('getAs', () => {
    const getAsResp = http.get(getAs);
    check(getAsResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('addQs', () => {
    var body = {
      "product_id": 1,
      "body": "this is the body",
      "name": "this is the name",
      "email": "this is the email"
    };
    const addQResp = http.post(addQ, JSON.stringify(body), {headers: {'Content-Type': 'application/json'}});
    check(addQResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('addAs', () => {
    var body = {
        "body": "this is the body",
        "name": "this is the name",
        "email": "this is the email",
        "photos": ["url1", "url2"]
    };
    const addAResp = http.post(addA, JSON.stringify(body), {headers: {'Content-Type': 'application/json'}});
    check(addAResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('Qhelp', () => {
    const QhelpResp = http.put(Qhelp);
    check(QhelpResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('Qreport', () => {
    const QreportResp = http.put(Qreport);
    check(QreportResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('Ahelp', () => {
    const AhelpResp = http.put(Ahelp);
    check(AhelpResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
  group('Areport', () => {
    const AreportResp = http.put(Areport);
    check(AreportResp, {
      'transaction time 10ms': (r) => r.timings.duration < 10,
      'transaction time 50ms': (r) => r.timings.duration < 50,
      'transaction time 200ms': (r) => r.timings.duration < 200,
      'transaction time 500ms': (r) => r.timings.duration < 500,
      'transaction time 1000ms': (r) => r.timings.duration < 1000,
      'transaction time 2000ms': (r) => r.timings.duration < 2000,
      'transaction time 5000ms': (r) => r.timings.duration < 5000,
      'transaction time 10s': (r) => r.timings.duration < 10000,
      'transaction time 20s': (r) => r.timings.duration < 20000
    });
  });
};