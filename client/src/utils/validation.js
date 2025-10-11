// Validation utilities for SpeakWise

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 6;
  const hasMinLength = password.length >= minLength;
  
  return {
    isValid: hasMinLength,
    errors: [
      ...(hasMinLength ? [] : [`Password must be at least ${minLength} characters long`])
    ]
  };
};

export const validateName = (name) => {
  const trimmedName = name.trim();
  const minLength = 2;
  const maxLength = 50;
  
  if (trimmedName.length < minLength) {
    return { isValid: false, error: 'Name must be at least 2 characters long' };
  }
  
  if (trimmedName.length > maxLength) {
    return { isValid: false, error: 'Name must be less than 50 characters long' };
  }
  
  return { isValid: true };
};

export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    fieldRules.forEach(rule => {
      const result = rule(value, formData);
      if (!result.isValid) {
        errors[field] = result.error;
        isValid = false;
      }
    });
  });
  
  return { isValid, errors };
};

export const createValidationRule = (validator, errorMessage) => {
  return (value) => ({
    isValid: validator(value),
    error: errorMessage
  });
};

export const required = (fieldName) => 
  createValidationRule(
    (value) => value && value.trim().length > 0,
    `${fieldName} is required`
  );

export const minLength = (min, fieldName) =>
  createValidationRule(
    (value) => !value || value.length >= min,
    `${fieldName} must be at least ${min} characters long`
  );

export const maxLength = (max, fieldName) =>
  createValidationRule(
    (value) => !value || value.length <= max,
    `${fieldName} must be less than ${max} characters long`
  );

export const email = () =>
  createValidationRule(
    validateEmail,
    'Please enter a valid email address'
  );

export const password = () =>
  createValidationRule(
    (value) => validatePassword(value).isValid,
    'Password must be at least 6 characters long'
  );

export const confirmPassword = (passwordField) =>
  createValidationRule(
    (value, formData) => value === formData[passwordField],
    'Passwords do not match'
  );

// Common validation rules
export const authValidationRules = {
  name: [required('Name'), minLength(2, 'Name'), maxLength(50, 'Name')],
  email: [required('Email'), email()],
  password: [required('Password'), password()],
  confirmPassword: [required('Confirm Password'), confirmPassword('password')]
};
