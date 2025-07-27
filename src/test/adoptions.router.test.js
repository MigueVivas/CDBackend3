import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
const expect = chai.expect;
chai.use(chaiHttp);

describe('Adoptions API', () => {
  describe('GET /api/adoptions', () => {
    it('debería devolver un array con status 200', (done) => {
      chai.request(app)
        .get('/api/adoptions')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
});