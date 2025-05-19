import { z, ZodError } from 'zod';

export type SchemaType<T extends z.ZodTypeAny> = z.infer<T>;
export type SchemaErrors<T extends z.ZodTypeAny> = z.inferFlattenedErrors<T>;

export type ActionState<T extends z.ZodTypeAny> = {
  status: 'SUCCESS' | 'ERROR' | 'GLOBAL_ERROR';
  schemaErrors?: SchemaErrors<T>;
  data?: SchemaType<T>;
  message?: string;
  formData?: FormData;
};

export function ActionError<T extends z.ZodTypeAny>(
  errors: unknown,
  message?: string,
  formData?: FormData
): ActionState<T> {
  if (errors instanceof ZodError) {
    return {
      status: 'ERROR',
      schemaErrors: errors.flatten(),
      message,
      formData,
    };
  } else if (errors instanceof Error) {
    return {
      status: 'ERROR',
      schemaErrors: undefined,
      message: errors.message,
      formData,
    };
  } else {
    return {
      status: 'GLOBAL_ERROR',
      schemaErrors: undefined,
      message: 'An unknown error occurred',
      formData,
    };
  }
}

export function ActionFeedback<T extends z.ZodTypeAny>(options: {
  status: ActionState<T>['status'];
  data?: SchemaType<T>;
  errors?: SchemaErrors<T>;
  formData?: FormData;
  message?: string;
}): ActionState<T> {
  return {
    status: options.status,
    data: options.data,
    message: options.message,
    schemaErrors: options.errors,
    formData: options.formData,
  };
}

export const INITIAL_STATE = {
  status: undefined,
  message: '',
  schemaErrors: {},
  timestamp: Date.now(),
};
