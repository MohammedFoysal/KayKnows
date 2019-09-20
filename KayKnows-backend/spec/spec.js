const request = require('supertest');
const assert = require("assert");

let server = require('../index')();

// Reporters
const JasmineConsoleReporter = require('jasmine-console-reporter');
let HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
  listStyle: 'indent', // "flat"|"indent"
  timeUnit: 'ms',      // "ms"|"ns"|"s"
  timeThreshold: {ok: 500, warn: 1000, ouch: 3000}, // Object|Number
  activity: "circle",     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
  emoji: true,
  beep: true
});

jasmine.getEnv().addReporter(reporter);
jasmine.getEnv().addReporter(new HtmlReporter({
  path: './results'
}));

// Tests below me
describe('loading express', () => {
  it('should load without errors', () => {
    expect(server).toBeTruthy();
  });

  it('should fail on unknown urls', function () {
    request(server)
    .get('/not-me')
    .expect(404);
  });
});

// These tests assume that the dummy data script has been run, please rerun the test db script before running
describe('get endpoints for base tables', () => {
  it('should respond to /capabilities', () => {
    return request(server)
    .get('/capabilities')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json.length === 11);
    })
  });

  it('should respond to /roles', () => {
    return request(server)
    .get('/roles')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json.length === 23);
    })
  });

  it('should respond to /families', () => {
    return request(server)
    .get('/families')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json.length === 6);
    })
  });

  it('should respond to /bands', () => {
    return request(server)
    .get('/bands')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json.length === 9);
    })
  });

  it('should respond to /all', function () {
    return request(server)
    .get('/all')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json.length === 23);
    })
  });

  it('should respond to /roles/role_id', () => {
    return request(server)
    .get('/roles/1')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json[0].role_id === 1);
      assert(json.length === 1);
    })
  });

  it('should respond to /capability-leads/capability_id', () => {
    return request(server)
    .get('/capability-leads/2')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json[0].capability_lead_id === 1);
      assert(json.length === 1);
    })
  });

  it('should respond to /users/user_id', () => {
    return request(server)
    .get('/users/1')
    .expect(200)
    .then(res => {
      let json = JSON.parse(res.text);
      assert(json[0].user_id === 1);
      assert(json.length === 1);
    })
  });
});

describe('post endpoints', () => {
  it('should respond to /add-family', () => {
    const family = {
      family_name: 'a family name'
    };

    return request(server)
    .post('/add-family')
    .send(family)
    .expect(200)
    .then(res => {
      let fam = JSON.parse(res.text);
      assert(fam.family_name === family.family_name);
    })
  });

  it('should accept a valid /add-capability', function () {
    const capability = {
      capability_name: 'steve',
      family_id: 1
    };

    return request(server)
    .post('/add-capability')
    .send(capability)
    .expect(200)
    .then(res => {
      let cap = JSON.parse(res.text);
      assert(cap.capability_name === capability.capability_name);
      assert(cap.family_id === capability.family_id);
    })
  });

});
