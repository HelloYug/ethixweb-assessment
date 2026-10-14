import test from 'node:test';
import assert from 'node:assert/strict';
import { leadSchema, SERVICE_OPTIONS } from '../lib/validation/lead.js';

const valid = { name: 'Asha Rao', email: 'asha@example.com', phone: '+91 9876543210', company: 'Example Co', website: 'https://example.com', service: 'web', message: 'We need a faster site and a clearer enquiry path for our growing team.', consent: true, honeypot: '', turnstileToken: 'test-token', sourcePage: '/contact' };

test('service catalog is allow-listed', () => {
  assert.deepEqual(SERVICE_OPTIONS.map((item) => item.id), ['web', 'growth', 'ai', 'crm', 'data', 'accessibility', 'support']);
});

test('valid lead payload passes', () => {
  assert.equal(leadSchema.safeParse(valid).success, true);
});

test('invalid service and missing consent fail', () => {
  const result = leadSchema.safeParse({ ...valid, service: 'other', consent: false });
  assert.equal(result.success, false);
});

test('short message fails', () => {
  assert.equal(leadSchema.safeParse({ ...valid, message: 'Too short' }).success, false);
});

test('phone and website formats are validated when supplied', () => {
  assert.equal(leadSchema.safeParse({ ...valid, phone: 'call-me', website: 'not a website' }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, phone: '+91 (98765) 43210', website: 'yourbusiness.co.in' }).success, true);
});

test('optional contact fields may be blank', () => {
  assert.equal(leadSchema.safeParse({ ...valid, phone: '', company: '', website: '' }).success, true);
});

test('honeypot submissions fail', () => {
  assert.equal(leadSchema.safeParse({ ...valid, honeypot: 'bot' }).success, false);
});

test('limits are enforced for names, email and messages', () => {
  assert.equal(leadSchema.safeParse({ ...valid, name: 'x'.repeat(121) }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, email: `${'x'.repeat(181)}@example.com` }).success, false);
  assert.equal(leadSchema.safeParse({ ...valid, message: 'x'.repeat(3001) }).success, false);
});

