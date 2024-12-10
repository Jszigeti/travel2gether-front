import { AxiosError } from "axios";

// How to use handleError function:
//  - If only one status code has to be personalized :
//      handleError(error, codeNumber, personalizedMessageHasToBeDisplayed)
//      example: handleError(error, 403, "Email or password incorrect")
//  - If two or more status codes need to be personalized :
//      handleError(error, [firstCodeNumber, secondCodeNumber, ...], {firstCodeNumber: personalizedMessageHasToBeDisplayed, secondCodeNumber: personalizedMessageHasToBeDisplayed, ... })
//      example: handleError(error, [403, 404], {403: "You're not allowed", 404: "Group not found"})

export const handleError = (
  error: unknown,
  errorCodesToCheck: number | number[],
  errorMessages: string | Record<number, string>
): string => {
  // Handle the case when errorMessages is a string (global error message)
  if (typeof errorMessages === "string") return errorMessages;
  // Ensure errorCodesToCheck is an array
  const codesToCheck = Array.isArray(errorCodesToCheck)
    ? errorCodesToCheck
    : [errorCodesToCheck];
  if (error instanceof AxiosError && error.response) {
    // If the status code is in the provided error codes, return the personalized message
    if (
      codesToCheck.includes(error.response.status) &&
      errorMessages[error.response.status]
    )
      return errorMessages[error.response.status];
    // If the error is server-related (status code >= 500)
    if (error.response.status >= 500)
      return "Une erreur serveur est survenue. Veuillez réessayer plus tard.";
    // If no match found, return a generic error message
    return "Une erreur inconnue est survenue.";
  }
  // If it's not an AxiosError, return the error message from a standard Error
  if (error instanceof Error) return error.message;
  // In case of an unknown error type
  return "Une erreur inconnue est survenue.";
};
