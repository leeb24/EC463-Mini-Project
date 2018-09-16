const expect = require('expect');
const request = require('supertest');

const { app } = require('/../server.js');
var { temperature_model } = require('./../models/temperature_model.js')
var { humidity_model } = require('./../models/humidity_model.js');

describe('Post /temperature', () => {
    it('Create a new temperature data', (done) => {
        var text = 'Test text';

        request(app).post('/temperature').send({ text }).expect(200).expect((res) => {
            expect(res.body.text).toBe(test);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect((todo.length).toBe(1);
                expect(todo[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });
});