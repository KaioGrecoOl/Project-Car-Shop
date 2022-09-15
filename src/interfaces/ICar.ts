import { z } from 'zod';

import { AutoZodSchema } from './IVehicle';

const CarZodSchema = AutoZodSchema.extend({
  doorsQty: z.number({ required_error: 'Doors quantity is required',
    invalid_type_error: 'Doors quantity must be a number' })
    .gte(2).int().lte(4),
  seatsQty: z.number({
    required_error: 'Seats quantity is required',
    invalid_type_error: 'Seats quantity must be a number',
  })
    .int().gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };
