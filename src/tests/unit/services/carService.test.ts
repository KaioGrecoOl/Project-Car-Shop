// template para criação dos testes de cobertura da camada de service


import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import CarsModels from '../../../models/CarsModel';
import { carMockWithId } from '../../mocks/carsMocks';
const { expect } = chai;

describe('Car Service test', () => {

  const carModel = new CarsModels();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  it('return a object with keys', async () => {
    const car = await carService.create(carMockWithId);
    expect(car).to.have.all.keys(['_id',
    'model',
    'year',
    'color',
    'buyValue',
    'doorsQty',
    'seatsQty'])
  });

});