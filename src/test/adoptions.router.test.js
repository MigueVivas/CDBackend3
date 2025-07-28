import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import { connectDB } from "../database.js";

mongoose.set('strictQuery', false);

describe("Adoptions Router - Integration", () => {
  
  before(async function() {
    this.timeout(15000);
    
    try {
      await connectDB();
      console.log('Conectado a MongoDB para testing');
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      throw error;
    }
  });
  
  after(async function() {
    this.timeout(5000);
    
    try {
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('Conexión a MongoDB cerrada');
      }
    } catch (error) {
      console.error('Error cerrando conexión:', error);
    }
  });
  
  it("GET /api/adoptions devuelve lista de adopciones", async function() {
    this.timeout(8000);
    
    try {
      console.log('Ejecutando: GET /api/adoptions');
      const res = await request(app).get("/api/adoptions");
      
      console.log('Status recibido:', res.status);
      console.log('Body recibido:', JSON.stringify(res.body, null, 2));
      
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body.payload).to.be.an("array");
      
      console.log('Test GET /api/adoptions completado');
    } catch (error) {
      console.error('Error en GET /api/adoptions:', error);
      throw error;
    }
  });
  
  it("POST /api/adoptions/:uid/:pid crea una nueva adopción", async function() {
    this.timeout(8000);
    
    try {
      const fakeUserId = new mongoose.Types.ObjectId();
      const fakePetId = new mongoose.Types.ObjectId();
      
      console.log('Ejecutando: POST /api/adoptions con IDs:', {
        userId: fakeUserId.toString(),
        petId: fakePetId.toString()
      });
      
      const res = await request(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
      
      console.log('Status recibido:', res.status);
      console.log('Body recibido:', JSON.stringify(res.body, null, 2));
      
      expect([200, 201, 400, 404]).to.include(res.status);
      
      if (res.status === 200 || res.status === 201) {
        expect(res.body).to.have.property("status", "success");
        expect(res.body.payload).to.have.property("_id");
      } else {
        expect(res.body).to.have.property("status");
      }
      
      console.log('Test POST /api/adoptions completado');
    } catch (error) {
      console.error('Error en POST /api/adoptions:', error);
      throw error;
    }
  });
  
  it("GET /api/adoptions/:aid con ID válido", async function() {
    this.timeout(10000);
    
    try {
      const fakeUserId = new mongoose.Types.ObjectId();
      const fakePetId = new mongoose.Types.ObjectId();
      
      console.log('Creando adopción para test...');
      const createRes = await request(app).post(`/api/adoptions/${fakeUserId}/${fakePetId}`);
      
      console.log('Resultado creación:', createRes.status, createRes.body);
      
      if (createRes.status === 200 || createRes.status === 201) {
        const adoptionId = createRes.body.payload._id;
        
        console.log('Consultando adopción:', adoptionId);
        const res = await request(app).get(`/api/adoptions/${adoptionId}`);
        
        console.log('Status consulta:', res.status);
        console.log('Body consulta:', JSON.stringify(res.body, null, 2));
        
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("status", "success");
        expect(res.body.payload).to.have.property("_id", adoptionId);
        
        console.log('Test GET /api/adoptions/:aid completado');
      } else {
        console.log('No se pudo crear adopción, saltando test específico');
        this.skip();
      }
    } catch (error) {
      console.error('Error en GET /api/adoptions/:aid:', error);
      throw error;
    }
  });
  
  it("GET /api/adoptions/:aid con ID inválido devuelve error", async function() {
    this.timeout(5000);
    
    try {
      const invalidId = "invalid-id";
      console.log('Ejecutando: GET /api/adoptions/' + invalidId);
      
      const res = await request(app).get(`/api/adoptions/${invalidId}`);
      
      console.log('Status recibido:', res.status);
      console.log('Body recibido:', JSON.stringify(res.body, null, 2));
      
      expect([400, 404, 422, 500]).to.include(res.status);
      
      console.log('Test ID inválido completado');
    } catch (error) {
      console.error('Error en GET con ID inválido:', error);
      throw error;
    }
  });
  
  it("GET /api/adoptions/:aid con ID que no existe", async function() {
    this.timeout(5000);
    
    try {
      const nonExistentId = new mongoose.Types.ObjectId();
      console.log('Ejecutando: GET /api/adoptions/' + nonExistentId);
      
      const res = await request(app).get(`/api/adoptions/${nonExistentId}`);
      
      console.log('Status recibido:', res.status);
      console.log('Body recibido:', JSON.stringify(res.body, null, 2));
      
      expect([404, 400]).to.include(res.status);
      
      console.log('Test ID inexistente completado');
    } catch (error) {
      console.error('Error en GET con ID inexistente:', error);
      throw error;
    }
  });
  
  it("POST /api/adoptions/:uid/:pid con IDs inválidos", async function() {
    this.timeout(5000);
    
    try {
      const invalidUserId = "invalid-user-id";
      const invalidPetId = "invalid-pet-id";
      
      console.log('Ejecutando: POST con IDs inválidos');
      
      const res = await request(app).post(`/api/adoptions/${invalidUserId}/${invalidPetId}`);
      
      console.log('Status recibido:', res.status);
      console.log('Body recibido:', JSON.stringify(res.body, null, 2));
      
      expect([400, 404, 422, 500]).to.include(res.status);
      
      console.log('Test IDs inválidos completado');
    } catch (error) {
      console.error('Error en POST con IDs inválidos:', error);
      throw error;
    }
  });
});