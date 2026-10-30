import test from 'node:test';
import assert from 'node:assert/strict';
import { appMode, isFrontendOnly } from '../src/config/appMode.js';

test('defaults to the safe frontend-only mode when no build mode is supplied', () => {
  assert.equal(appMode, 'frontend-only');
  assert.equal(isFrontendOnly, true);
});
