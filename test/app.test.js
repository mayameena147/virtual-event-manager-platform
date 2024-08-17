const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);


const app = require('../app');

let token;
let eventId;



describe('Event Management Platform', () => {
    // User registration
    describe('POST /register', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/users/signup')
                .send({
                    name: 'testuser',
                    password: 'testpassword',
                    email: "test@gmail.com",
                    role: "organiser"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eql('User registered successfully');
                    done();
                });
        });

        it('should not register if inputs are missing', (done) => {
            chai.request(app)
                .post('/users/signup')
                .send({
                   name: 'testuser',
                   password: 'testpassword',
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error').eql('Please provide all details');
                    done();
                });
        });
    });

    // User login
    describe('POST /login', () => {
        it('should login the user and return a JWT token', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({
                    name: "user",
                    password: "password",
                    email: "email@gmail.com",
                    role: "Organiser"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    token = res.body.token; // Save token for later authenticated requests
                    done();
                });
        });

        it('should not login with incorrect password', (done) => {
            chai.request(app)
                .post('/users/login')
                .send({
                    name: 'user',
                    password: 'wrongpassword',
                    email: "email@gmail.com",
                    role: "Organiser"
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('error').eql('Invalid credentials');
                    done();
                });
        });
    });

    // Event management
    describe('Event CRUD Operations', () => {
        // Create event
        describe('POST /events', () => {
            it('should create a new event', (done) => {
                chai.request(app)
                    .post('/events')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        date: '2024-08-30',
                        time: '10:00',
                        description: 'Sample Event'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.property('message').eql('Event created successfully');
                        eventId = res.body.event.id; // Save event ID for later operations
                        done();
                    });
            });
        });

        // Update event
        describe('PUT /events/:id', () => {
            it('should update the event details', (done) => {
                chai.request(app)
                    .put(`/events/${eventId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        date: '2024-09-01',
                        time: '11:00',
                        description: 'Updated Event'
                    })
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').eql('Event updated successfully');
                        done();
                    });
            });
        });

        // Delete event
        describe('DELETE /events/:id', () => {
            it('should delete the event', (done) => {
                chai.request(app)
                    .delete(`/events/${eventId}`)
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').eql('Event deleted successfully');
                        done();
                    });
            });
        });
    });

    // Event registration
    describe('POST /events/:id/register', () => {
        it('should register a user for an event', (done) => {
            // Assuming the event with ID eventId exists
            chai.request(app)
                .post(`/events/${1}/register`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eql('Registered for event successfully');
                    done();
                });
        });

        it('should not allow registration for a non-existent event', (done) => {
            chai.request(app)
                .post(`/events/invalidId/register`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error').eql('Event not found');
                    done();
                });
        });
    });
});