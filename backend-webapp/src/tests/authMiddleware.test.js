const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `./.env.development` })
const { authenticateToken, generateAccessToken, generateRefreshToken } = require('../middleware/auth');

const { expect } = chai;
chai.use(chaiHttp);


describe('Authentication Middleware', () => {
    it('should return 401 for expired access token', (done) => {
        const id = '1'; // Replace with a valid user ID
        const expiredToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '-1s' });

        const req = {
            headers: {
                authorization: `Bearer ${expiredToken}`,
            },
        };
        const res = {
            sendStatus: (status) => {
                expect(status).to.equal(401);
                done();
            },
        };

        authenticateToken(req, res, () => { });
    });

    it('should return 401 for invalid access token', (done) => {
        const req = {
            headers: {
                authorization: 'Bearer invalidToken',
            },
        };
        const res = {
            sendStatus: (status) => {
                expect(status).to.equal(401);
                done();
            },
        };

        authenticateToken(req, res, () => { });
    });

    it('should return 401 for empty access token', (done) => {
        const req = {
            headers: {
                authorization: 'Bearer ',
            },
        };
        const res = {
            sendStatus: (status) => {
                expect(status).to.equal(401);
                done();
            },
        };

        authenticateToken(req, res, () => { });
    });

    it('should generate a valid refresh token', () => {
        const id = '1'; // Replace with a valid user ID
        const refreshToken = generateRefreshToken(id);

        expect(refreshToken).to.be.a('string');
        // Add more assertions as needed
    });

    it('should return 401 for expired refresh token', (done) => {
        const id = '1'; // Replace with a valid user ID
        const expiredRefreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '-1s' });

        const req = {
            headers: {
                authorization: `Bearer ${expiredRefreshToken}`,
            },
        };
        const res = {
            sendStatus: (status) => {
                expect(status).to.equal(401);
                done();
            },
        };

        authenticateToken(req, res, () => { });
    });

    it('should generate an access token', () => {
        const id = '1'; // Replace with a valid user ID
        const token = generateAccessToken(id);

        expect(token).to.be.a('string');
        // Add more assertions as needed
    });
});