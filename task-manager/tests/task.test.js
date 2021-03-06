const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { userOneId, 
        userOne, 
        userTwoId, 
        userTwo, 
        taskOne, 
        taskTwo,
        taskThree,
        setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From My Test'
        })
        .expect(201)
    
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Should fetch all tasks for one user', async () => {
    const response = await request(app)
        .get('/tasks/')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

        expect(response.body.length).toEqual(2)
})

test('Should fail to have second user delete first task', async () => {
    const respone = await request(app)
        .delete('/tasks/' + taskOne._id)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})

/**
 *  Extra Tests to Complete
 *  links.mead.io/extratests
 */