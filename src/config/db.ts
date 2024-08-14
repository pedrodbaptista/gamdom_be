import {z} from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

export const DbConfig = z.object({
  DB_HOST: z
    .string({
      invalid_type_error: 'DB_HOST must be a string'
    })
    .default('localhost'),
  DB_PORT: z
    .string({invalid_type_error: 'DB_PORT must be a number'})
    .default('5432'),
  DB_USER: z
    .string({
      invalid_type_error: 'DB_USER must be a string'
    })
    .default('postgres'),
  DB_PASS: z
    .string({
      invalid_type_error: 'DB_PASS must be a string'
    })
    .default('postgres'),
  DB_NAME: z
    .string({
      invalid_type_error: 'BD_NAME must be a string'
    })
    .default('postgres')
});

export type DatabaseConfig = z.infer<typeof DbConfig>;

export const validateDbConfiguration = (
  config: Record<string, unknown>
): DatabaseConfig => {
  const parsedConfig = DbConfig.safeParse(config);

  if (parsedConfig.success) {
    return parsedConfig.data;
  }

  // Format error message for better readability
  const formattedErrors = parsedConfig.error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message
  }));

  throw new Error(
    `DB configuration validation failure: ${JSON.stringify(formattedErrors, null, 2)}`
  );
};

const dbConfig = validateDbConfiguration(process.env);

export default {dbConfig};
