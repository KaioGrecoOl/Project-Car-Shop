import { model as mongooseCreateModel, Schema } from 'mongoose';
import MongoModel from './MongoModel';
import { ICar } from '../interfaces/ICar';

const carsMongooseSchema = new Schema<ICar>({
  model: String,
  year: String,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
});

class CarsModels extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('Car', carsMongooseSchema)) {
    super(model);
  }
}

export default CarsModels;