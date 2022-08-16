/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */

import {
  Matchers,
  synchronousBodyHandler,
} from '@pact-foundation/pact';
import { messagePactWith } from 'jest-pact';
import { resolve } from 'path';

import { catApiHandler } from './cat-handler';

const { term } = Matchers;
const dir = resolve(__dirname, '../pacts');
const logDir = dir;

messagePactWith(
  { consumer: 'consumer-messaging', provider: 'provider-messaging', dir, logDir, pactfileWriteMode: 'overwrite' },
  (messagePact) => {
    describe('message contract between consumer and provider', () => {
      it('accepts a valid cat', async () => {
        return messagePact
          .given('a cat named drover')
          .expectsToReceive('a request for a cat')
          .withContent(term({
            generate: JSON.stringify({ type: 'type1' }),
            matcher: JSON.stringify({ type: 'type1|type2' }),
          }))
          .withMetadata({
            queue: 'animals',
          })
          .verify(synchronousBodyHandler(catApiHandler));
      });
    });
  },
);
