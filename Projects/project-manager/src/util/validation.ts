namespace App {
  // Validation
  export interface validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(input: validatable) {
    const {
      value,
      required,
      minLength = 0,
      maxLength = 30,
      min = 0,
      max = 10,
    } = input;

    if (!value.toString().trim() && required) return false;

    if (typeof value === "string") {
      const length = value.trim().length;
      if (length < minLength || length > maxLength) return false;
    }

    if (typeof value === "number") {
      if (value < min || value > max) return false;
    }

    return true;
  }
}
