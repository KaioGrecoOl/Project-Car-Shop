// template para criação dos testes de cobertura da camada de service


import * as sinon from 'sinon';
import chai from 'chai';
import CarService from '../../../services/CarService';
import CarsModels from '../../../models/CarsModel';
import { carMockWithId } from '../../mocks/carsMocks';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Service test', () => {

  const carModel = new CarsModels();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'readOne')
       .onCall(0).resolves(carMockWithId)
       .onCall(1).resolves(null)
       .onCall(2).resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
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
  })

  describe('ReadOne car', () => {
    it('Success', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    })

    it('Failure', async () => {
      try { 
        await carService.readOne(carMockWithId._id);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
      }
    })
  })
    
});