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
    const car = await this._cars.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    await this.readOne(_id);
    return this._cars.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    return this._cars.delete(_id);
  }
}

export default CarService;