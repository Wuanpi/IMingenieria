export type IdentifierType = 'email' | 'national_id';

export const MIN_NATIONAL_ID_LENGTH = 6;
export const MAX_NATIONAL_ID_LENGTH = 10;

export function normalizeIdentifier(value: string): string {
  const trimmedValue = value.trim();

  if (trimmedValue.includes('@')) {
    return trimmedValue.toLowerCase();
  }

  return trimmedValue.replace(/\D/g, '');
}

export function detectIdentifierType(value: string): IdentifierType {
  return value.includes('@') ? 'email' : 'national_id';
}

export function isValidEmail(value: string): boolean {
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidNationalId(value: string): boolean {
  const nationalId = value.replace(/\D/g, '');

  return (
    nationalId.length >= MIN_NATIONAL_ID_LENGTH &&
    nationalId.length <= MAX_NATIONAL_ID_LENGTH
  );
}

export function validateIdentifier(value: string): {
  isValid: boolean;
  type: IdentifierType;
  normalizedValue: string;
  message?: string;
} {
  const normalizedValue = normalizeIdentifier(value);
  const type = detectIdentifierType(normalizedValue);

  if (!normalizedValue) {
    return {
      isValid: false,
      type,
      normalizedValue,
      message: 'Ingresa tu correo electrónico o cédula.',
    };
  }

  if (type === 'email') {
    if (!isValidEmail(normalizedValue)) {
      return {
        isValid: false,
        type,
        normalizedValue,
        message: 'Ingresa un correo electrónico válido.',
      };
    }
  } else {
    if (!isValidNationalId(normalizedValue)) {
      return {
        isValid: false,
        type,
        normalizedValue,
        message: `La cédula debe tener entre ${MIN_NATIONAL_ID_LENGTH} y ${MAX_NATIONAL_ID_LENGTH} dígitos.`,
      };
    }
  }

  return {
    isValid: true,
    type,
    normalizedValue,
  };
}