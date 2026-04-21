import { submitOrder } from './actions';
import type { FormData } from './types';

const validData: FormData = {
  name: 'Sara Ahmed',
  phone: '01012345678',
  governorate: 'القاهرة',
  city: 'مدينة نصر',
  area: 'District 1',
  street: 'Street 10',
  building: '15A',
  landmark: 'Near the club',
  paymentMethod: 'vodafone',
  paymentProof: 'https://example.com/image.jpg',
  transferNumber: '01012345678',
  transferName: 'Sara Ahmed',
  quantity: 2,
  totalPrice: 720,
};

describe('submitOrder', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns validation errors for invalid form data', async () => {
    const result = await submitOrder({
      ...validData,
      phone: '1234',
      paymentMethod: '',
    });

    expect(result.success).toBe(false);
    expect(result.errors?.phone).toBeDefined();
    expect(result.errors?.paymentMethod).toBeDefined();
  });

  it('builds a whatsapp url with a normalized Egyptian admin number', async () => {
    process.env.NEXT_PUBLIC_ADMIN_WHATSAPP = '01035253389';

    const result = await submitOrder(validData);

    expect(result.success).toBe(true);
    expect(result.orderId).toMatch(/^ORD-[A-F0-9]{8}$/);
    expect(result.whatsappUrl).toContain('https://wa.me/201035253389');
  });
});
