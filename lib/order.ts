import { randomUUID } from 'node:crypto';
import { ADMIN_WHATSAPP_NUMBER } from './constants';

const DEFAULT_ADMIN_WHATSAPP = ADMIN_WHATSAPP_NUMBER;

export const createOrderId = (): string => {
  return `ORD-${randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
};

export const normalizeWhatsAppNumber = (value?: string): string => {
  const digits = (value || DEFAULT_ADMIN_WHATSAPP).replace(/\D/g, '');

  if (digits.startsWith('20') && digits.length === 12) {
    return digits;
  }

  if (digits.startsWith('0') && digits.length === 11) {
    return `20${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `20${digits}`;
  }

  return ADMIN_WHATSAPP_NUMBER;
};

export const buildWhatsAppUrl = (number: string | undefined, message: string): string => {
  const normalizedNumber = normalizeWhatsAppNumber(number);
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${normalizedNumber}?text=${encodedMessage}`;
};
