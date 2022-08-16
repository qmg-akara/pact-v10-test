export function catApiHandler(body: string): void {
  if (body !== '{"type":"type1"}') {
    throw new Error('Invalid body');
  }
}
