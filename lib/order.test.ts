import { buildWhatsAppUrl, createOrderId, normalizeWhatsAppNumber } from './order';

describe('createOrderId', () => {
  it('creates a stable order id format', () => {
    expect(createOrderId()).toMatch(/^ORD-[A-F0-9]{8}$/);
  });
});

describe('normalizeWhatsAppNumber', () => {
  it.each<[string, string]>([
    ['201035253389', '201035253389'],
    ['01035253389', '201035253389'],
    ['+20 103 525 3389', '201035253389'],
    ['1035253389', '201035253389'],
  ])('normalizes %s into %s', (input, expected) => {
    expect(normalizeWhatsAppNumber(input)).toBe(expected);
  });

  it('falls back to the default admin number for invalid input', () => {
    expect(normalizeWhatsAppNumber('abc')).toBe('201035253389');
  });
});

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL using the normalized number and encoded message', () => {
    const url = buildWhatsAppUrl('01035253389', 'Hello world');

    expect(url).toContain('https://wa.me/201035253389');
    expect(url).toContain('Hello%20world');
  });
});
