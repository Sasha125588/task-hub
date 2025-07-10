import { Amplify } from "aws-amplify";

const userPoolId = process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL;
const userPoolClientId =
  process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID;

if (!userPoolId || !userPoolClientId) {
  throw new Error("Missing required AWS Cognito environment variables");
}

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code" as const,
      userAttributes: {
        email: {
          required: true,
        },
        name: {
          required: false,
        },
      },
    },
  },
};

if (typeof window !== "undefined") {
  Amplify.configure(amplifyConfig);
}

export { amplifyConfig };
