/** An error whose message is safe to show to the assistant (anything else is reported as a generic failure). */
export class RedditError extends Error {
  constructor(message: string, readonly status?: number) { super(message) }
}
