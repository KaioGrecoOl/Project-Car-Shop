import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _cars: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._cars.create(obj);
  }

  public async read(): Promise<ICar[]> {
    const cars = await this._cars.read();
    if (!cars) throw new Error(ErrorTypes.EntityNotFound);
    return cars;
  }

  public async readOne(_id: string): Promise<ICar> {
    const frame = await this._cars.readOne(_id);
    if (!frame) throw new Error(ErrorTypes.EntityNotFound);
    return frame;
  }
}

export default CarService;