import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PatchApprovalSchema } from '../src/lib/schemas'

test('delegation requires a nonblank recipient', () => {
  for (const delegatedTo of [undefined, '', '   ']) {
    assert.equal(PatchApprovalSchema.safeParse({ action: 'delegate', delegatedTo }).success, false)
  }
  assert.deepEqual(PatchApprovalSchema.parse({ action: 'delegate', delegatedTo: '  Operations manager  ' }), {
    action: 'delegate', delegatedTo: 'Operations manager',
  })
})

test('approve and reject do not require delegation details', () => {
  assert.equal(PatchApprovalSchema.safeParse({ action: 'approve' }).success, true)
  assert.equal(PatchApprovalSchema.safeParse({ action: 'reject', rejectionNote: 'Needs revision' }).success, true)
  assert.equal(PatchApprovalSchema.safeParse({ action: 'delegate', delegatedTo: 'x'.repeat(101) }).success, false)
})
