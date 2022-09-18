import { Router, Request, Response } from 'express';
import CarsModels from '../models/CarsModel';
import CarService from '../services/CarService';
import CarController from '../controllers/CarController';

const Carroute = Router();

const car = new CarsModels();
const carsService = new CarService(car);
const carController = new CarController(carsService);

Carroute.post('/cars', (req: Request, res: Response) =>
  carController.create(req, res));

Carroute.get('/cars', (req: Request, res: Response) =>
  carController.read(req, res));

Carroute.get('/cars/:id', (req: Request, res: Response) =>
  carController.readOne(req, res));

Carroute.put('/cars/:id', (req: Request, res: Response) =>
  carController.update(req, res));

export default Carroute;
