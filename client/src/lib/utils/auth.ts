export const generateConfirmationToken = () => crypto.randomUUID();

// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#API_SignUp_Errors
export const handleAuthError = (error: unknown, defaultMessage: string) => {
  switch (error) {
    case "NotAuthorizedException":
      return new Error("Incorrect email or password");
    case "UserNotFoundException":
      return new Error("User not found");
    case "UserNotConfirmedException":
      return new Error("Please confirm your email before logging in");
    case "InvalidParameterException":
      return new Error("Invalid parameters provided. Please check your input.");
    case "UsernameExistsException":
      return new Error("User with this email already exists.");
    case "InternalErrorException":
      return new Error("Amazon Cognito encounters an internal error");
    default:
      break;
  }
  return new Error(defaultMessage);
};
