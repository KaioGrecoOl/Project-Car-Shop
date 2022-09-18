// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import { carMockWithId, carMockWithoutId } from '../../mocks/carsMocks';
import CarService from '../../../services/CarService';
import CarsModels from '../../../models/CarsModel';
import CarController from '../../../controllers/CarController';
const { expect } = chai;

describe('Car Controller test', () => {

  const carModel = new CarsModels();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .resolves(carMockWithoutId);
    sinon.stub(carService, 'readOne').resolves(carMockWithoutId)

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('status response', async () => {
      req.body = carMockWithoutId;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithoutId)).to.be.true;
    })
  });

  describe('ReadOne car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithoutId)).to.be.true;
    })
  })

});