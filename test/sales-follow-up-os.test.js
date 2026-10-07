const test = require('node:test');
const assert = require('node:assert');
const { SalesFollowUpOS } = require('../src/index.js');

test('SalesFollowUpOS: extracts promise to send quote', () => {
  const os = new SalesFollowUpOS();
  const res = os.extractCommitments({
    id: 'n1',
    clientName: 'Stripe',
    text: 'Great call with buyer. Promised to send the proposal tomorrow morning.'
  });
  assert.strictEqual(res.hasPendingPromises, true);
  assert.strictEqual(res.commitments[0].type, 'SEND_PROPOSAL_QUOTE');
});
