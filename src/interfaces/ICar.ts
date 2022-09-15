import { z } from 'zod';

import { AutoZodSchema } from './IVehicle';

const CarZodSchema = AutoZodSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };
