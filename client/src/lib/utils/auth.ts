export function generateConfirmationToken() {
  return crypto.randomUUID();
}

export const validateAuthParameters = (
  email: string,
  password: string
): boolean => {
  if (!email || !password) {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  return isValidEmail(email);
};

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.length > 0 && emailRegex.test(email);
}

export const handleAuthError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    if (
      error.message.includes("incorrect username or password") ||
      error.message.includes("NotAuthorizedException")
    ) {
      throw new Error("Incorrect email or password");
    }
    if (
      error.message.includes("User does not exist") ||
      error.message.includes("UserNotFoundException")
    ) {
      throw new Error("User not found");
    }
    if (error.message.includes("Password attempts exceeded")) {
      throw new Error("Too many failed attempts. Please try again later");
    }
    if (
      error.message.includes("User is not confirmed") ||
      error.message.includes("NotConfirmedException")
    ) {
      throw new Error("Please confirm your email before logging in");
    }
    if (error.message.includes("UserUnAuthenticatedException")) {
      throw new Error(
        "Authentication configuration error. Please check your AWS Cognito setup."
      );
    }
    if (error.message.includes("InvalidParameterException")) {
      throw new Error("Invalid parameters provided. Please check your input.");
    }
    if (error.message.includes("UsernameExistsException")) {
      throw new Error("User with this email already exists.");
    }
    throw error;
  }
  throw new Error(defaultMessage);
};
