import { FieldValues, UseFormReturn, Path } from 'react-hook-form';
import { AxiosError } from 'axios';

interface ErrorHandlerOptions<T extends FieldValues> {
  error: unknown;
  form?: UseFormReturn<T>;
  onToast?: (message: string) => void;
}

interface ErrorResponse {
  message?: string;
  fields?: Record<string, string>;
}

export function handleError<T extends FieldValues>({
  error,
  form,
  onToast,
}: ErrorHandlerOptions<T>): void {
  let toastMessage = 'Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.';

  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;
    if (data?.fields && form) {
      Object.entries(data.fields).forEach(([field, message]) => {
        form.setError(field as Path<T>, { type: 'manual', message });
      });

      if (onToast && data.message) {
        onToast(data.message);
      }
      return;
    }

    if (data?.message) {
      toastMessage = data.message;
    }
  }

  if (error instanceof Error) {
    toastMessage = error.message;
  }

  if (onToast) {
    onToast(toastMessage);
  }
}
