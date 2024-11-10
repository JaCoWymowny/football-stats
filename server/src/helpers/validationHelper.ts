interface PasswordChangeData {
  currentPassword?: string;
  newPassword?: string;
}

export function validatePasswordChange(data: PasswordChangeData): string | null {
  const { currentPassword, newPassword } = data;

  if (newPassword) {
    if (!currentPassword) {
      return 'Obecne hasło jest wymagane, aby ustawić nowe hasło.';
    }

    if (!newPassword) {
      return 'Nowe hasło jest wymagane.';
    }

    if (newPassword === currentPassword) {
      return 'Nowe hasło nie może być takie samo jak obecne.';
    }
  }

  return null;
}
