// This is your message handler function.
// It expects to receive a valid "dog" object
// and returns a failed promise if not
export function dogApiHandler(body: string): void {
  if (body !== '{"type":"bulldog"}') {
    throw new Error('Invalid body');
  }
}
