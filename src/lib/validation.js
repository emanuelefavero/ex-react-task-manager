import { z } from 'zod';

const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['To do', 'Doing', 'Done']),
  createdAt: z.date(),
});
