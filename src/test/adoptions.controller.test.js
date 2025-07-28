import { expect } from "chai";
import sinon from "sinon";
import adoptionsController from "../controllers/adoptions.controller.js";
import { adoptionsService, petsService, usersService } from "../services/index.js";

const fakeUser = { _id: "user123", pets: [] };
const fakePet = { _id: "pet123", adopted: false };
const fakeAdoption = { _id: "adop123", owner: "user123", pet: "pet123" };

function mockRes() {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
}

describe("Adoptions Controller - Unit", () => {
  afterEach(() => sinon.restore());

  it("getAllAdoptions devuelve lista de adopciones", async () => {
    const res = mockRes();
    const req = {};

    sinon.stub(adoptionsService, "getAll").resolves([fakeAdoption]);

    await adoptionsController.getAllAdoptions(req, res);

    expect(res.send.calledOnce).to.be.true;
    const responseArg = res.send.getCall(0).args[0];
    expect(responseArg).to.deep.equal({ status: "success", payload: [fakeAdoption] });
  });

  it("getAdoption retorna una adopción por ID", async () => {
    const req = { params: { aid: "adop123" } };
    const res = mockRes();

    sinon.stub(adoptionsService, "getBy").resolves(fakeAdoption);

    await adoptionsController.getAdoption(req, res);

    expect(res.send.calledOnce).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "success", payload: fakeAdoption });
  });

  it("getAdoption responde 404 si no se encuentra", async () => {
    const req = { params: { aid: "notfound" } };
    const res = mockRes();

    sinon.stub(adoptionsService, "getBy").resolves(null);

    await adoptionsController.getAdoption(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "error", error: "Adoption not found" });
  });

  it("createAdoption crea una adopción exitosamente", async () => {
    const req = { params: { uid: "user123", pid: "pet123" } };
    const res = mockRes();

    sinon.stub(usersService, "getUserById").resolves(fakeUser);
    sinon.stub(petsService, "getBy").resolves(fakePet);
    sinon.stub(usersService, "update").resolves();
    sinon.stub(petsService, "update").resolves();
    sinon.stub(adoptionsService, "create").resolves();

    await adoptionsController.createAdoption(req, res);

    expect(res.send.calledOnce).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "success", message: "Pet adopted" });
  });

  it("createAdoption responde 404 si no existe el usuario", async () => {
    const req = { params: { uid: "noUser", pid: "pet123" } };
    const res = mockRes();

    sinon.stub(usersService, "getUserById").resolves(null);

    await adoptionsController.createAdoption(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "error", error: "user Not found" });
  });

  it("createAdoption responde 404 si no existe la mascota", async () => {
    const req = { params: { uid: "user123", pid: "noPet" } };
    const res = mockRes();

    sinon.stub(usersService, "getUserById").resolves(fakeUser);
    sinon.stub(petsService, "getBy").resolves(null);

    await adoptionsController.createAdoption(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "error", error: "Pet not found" });
  });

  it("createAdoption responde 400 si la mascota ya está adoptada", async () => {
    const req = { params: { uid: "user123", pid: "pet123" } };
    const res = mockRes();

    sinon.stub(usersService, "getUserById").resolves(fakeUser);
    sinon.stub(petsService, "getBy").resolves({ ...fakePet, adopted: true });

    await adoptionsController.createAdoption(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.send.getCall(0).args[0]).to.deep.equal({ status: "error", error: "Pet is already adopted" });
  });
});
