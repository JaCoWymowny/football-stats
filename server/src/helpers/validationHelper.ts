interface PasswordChangeData {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export function validatePasswordChange(data: PasswordChangeData): string | null {
  const { currentPassword, password, confirmPassword } = data;

  if (password || confirmPassword) {
    if (!currentPassword) {
      return 'Obecne hasło jest wymagane, aby ustawić nowe hasło.';
    }

    if (!password) {
      return 'Nowe hasło jest wymagane.';
    }

    if (!confirmPassword) {
      return 'Potwierdzenie nowego hasła jest wymagane.';
    }

    if (password !== confirmPassword) {
      return 'Nowe hasło i jego potwierdzenie muszą być identyczne.';
    }

    if (password === currentPassword) {
      return 'Nowe hasło nie może być takie samo jak obecne.';
    }
  }

  return null;
}
