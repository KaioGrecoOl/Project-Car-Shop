// template para criação dos testes de cobertura da camada de model


import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarsModels from '../../../models/CarsModel';
import { carMockWithId, carMockWithoutId } from '../../mocks/carsMocks';
const { expect } = chai;

describe('Car Models test', () => {

  const carModel = new CarsModels();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('return a object', async () => {
    const car = await carModel.create(carMockWithoutId);
    expect(car).to.be.an('object')
  });

});