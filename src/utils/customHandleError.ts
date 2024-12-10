import { handleError } from "axios-error-handler-ts";

export const customHandleError = (
  err: unknown,
  errorMessages: string | Record<number, string>,
  errorCodeToCheck?: number
): string => {
  return handleError(
    err,
    errorMessages,
    errorCodeToCheck,
    "Une erreur serveur est survenue, veuillez réessayer plus tard.",
    "Une erreur inconnue est survenue."
  );
};
