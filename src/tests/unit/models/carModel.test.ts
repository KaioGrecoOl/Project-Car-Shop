// template para criação dos testes de cobertura da camada de model


import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarsModels from '../../../models/CarsModel';
import { carMockWithId, carMockWithoutId } from '../../mocks/carsMocks';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Models test', () => {

  const carModel = new CarsModels();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findOne')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating car', () => {
    it('return a object', async () => {
      const car = await carModel.create(carMockWithoutId);
      expect(car).to.be.an('object')
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const searchCar = await carModel.readOne('4edd40c86762e0fb12000003');
      expect(searchCar).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      try {
        await carModel.readOne('1234Errado');
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    })
  })

});