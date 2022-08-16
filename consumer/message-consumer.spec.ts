/* tslint:disable:no-unused-expression object-literal-sort-keys max-classes-per-file no-empty */

import {
  Matchers,
  synchronousBodyHandler,
} from '@pact-foundation/pact';
import { messagePactWith } from 'jest-pact';
import { resolve } from 'path';

import { dogApiHandler } from './dog-handler';

const { term } = Matchers;
const dir = resolve(__dirname, '../pacts');
const logDir = dir;

messagePactWith(
  { consumer: 'consumer-messaging', provider: 'provider-messaging', dir, logDir, pactfileWriteMode: 'overwrite' },
  (messagePact) => {
    describe('message contract between consumer and provider', () => {
      it('accepts a valid dog', async () => {
        return messagePact
          .given('a dog named drover')
          .expectsToReceive('a request for a dog')
          .withContent(term({
            generate: JSON.stringify({ type: 'bulldog' }),
            matcher: JSON.stringify({ type: 'bulldog|sheepdog' }),
          }))
          .withMetadata({
            queue: 'animals',
          })
          .verify(synchronousBodyHandler(dogApiHandler));
      });
    });
  },
);
