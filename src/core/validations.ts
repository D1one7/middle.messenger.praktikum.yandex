
type ValidationRule = (value: any, key: string) => Record<string, string>;

export function validateData(data: Record<string, any>, validationRules: Record<string, ValidationRule>): Record<string, string> {
    const errors: Record<string, string> = {};
    Object.entries(data).forEach(([key, value]) => {
        const validationRule = validationRules[key];
        if (validationRule) {
            const result = validationRule(value, key);
            Object.assign(errors, result);
        }
    });
    return errors;
}



type ValidationErrors = { [key: string]: string };
export function messageValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    if (!value.length) {
        errors[input] = 'Это поле обязательно к заполнению';
    }
    return errors;
}

export function nameValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    const requiredError = `Это поле обязательно к заполнению`;
    const nameError = `Первая буква должна быть заглавной, запрещены пробелы, цифры, спецсимволы`;
    if (!value.length) {
        errors[input] = requiredError;
    } else {
        const nameRegex = /^[A-ZА-Я][A-ZА-Яa-zа-я- ]+$/;
        const isValidName = nameRegex.test(value);
        errors[input] = isValidName ? '' : nameError;
    }
    return errors;
}

export function loginValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    const nameRegex = /^(?=.*[A-z])[A-z0-9-_]{3,20}$/;
    if (!value.trim()) {
        errors[input] = 'Это поле обязательно к заполнению';
    } else if (!nameRegex.test(value)) {
        errors[input] = 'Логин должен состоять из латинских символов (от 3 до 20), без пробелов, без спецсимволов (кроме дефиса и нижнего подчёркивания)';
    }
    return errors;
}

export function passwordValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    const nameRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-z0-9!@#$%^&*]{8,40}$/;
    if (!value.trim()) {
        errors[input] = 'Это поле обязательно к заполнению';
    } else if (!nameRegex.test(value)) {
        errors[input] = 'От 8 до 40 символов, обязательно должна присутствовать заглавная буква и цифра';
    }
    return errors;
}
export function emailValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    const nameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (!value.trim()) {
        errors[input] = 'Это поле обязательно к заполнению';
    } else if (!nameRegex.test(value)) {
        errors[input] = 'Некорректная почта';
    }
    return errors;
}
export function phoneValidation(value: string, input: string): ValidationErrors {
    const errors: ValidationErrors = {};
    const nameRegex = /^(\+)?[0-9]{10,15}$/;
    if (!value.trim()) {
        errors[input] = 'Это поле обязательно к заполнению';
    } else if (!nameRegex.test(value)) {
        errors[input] = 'Некорректный телефон';
    }
    return errors;
}




type ValidationRules = Record<string, (value: string, fieldName: string) => { [key: string]: string }>;
const createValidationRules = (...keys: string[]): ValidationRules => {
    const rules: ValidationRules = {};
    for (const key of keys) {
        rules[key] = key === "password" || key === "oldPassword" || key === "newPassword" ? passwordValidation : key === "email" ? emailValidation : key === "phone" ? phoneValidation : nameValidation;
    }
    rules.login = loginValidation;
    return rules;
};

export const signInRules = createValidationRules("login", "password");
export const profileRules = createValidationRules("login", "email", "first_name", "second_name", "display_name", "phone");
export const signUpRules = createValidationRules("login", "email", "first_name", "second_name", "display_name", "phone", "password");
