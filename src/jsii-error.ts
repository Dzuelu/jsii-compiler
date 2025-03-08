/**
 * Throws an error that is intended as CLI output.
 */
export class JsiiError extends Error {
  /**
   * An expected error that can be nicely formatted where needed (e.g. in CLI output)
   * This should only be used for errors that a user can fix themselves.
   *
   * @param message The error message to be printed to the user.
   * @param showHelp Print the help before the error.
   */
  constructor(public override readonly message: string, public readonly showHelp = false) {
    super(message);
    Object.setPrototypeOf(this, JsiiError.prototype);
  }
}
