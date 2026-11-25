import { z } from 'zod';
import { STATUS_OPTIONS } from '@/data/tasks';

const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~\\';

export const taskTitleSchema = z
  .string()
  .trim()
  .min(1, 'Title cannot be empty')
  .refine(
    title => ![...title].some(char => SYMBOLS.includes(char)),
    'Title cannot contain special characters',
  );

export const taskSchema = z.object({
  id: z.int().positive(),
  title: taskTitleSchema,
  description: z.string().optional(),
  status: z.enum(STATUS_OPTIONS),
  createdAt: z.date(),
});

export const validate = (schema, data) => {
  const result = schema.safeParse(data);

  return !result.success
    ? { success: false, error: result.error.issues[0].message }
    : { success: true, data: result.data };
};
