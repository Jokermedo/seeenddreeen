import {
  calculateTotalPrice,
  prepareWhatsAppMessage,
  uploadImageToCloudinary,
  validateFormData,
  validateUploadFile,
} from './utils';
import { MAX_QUANTITY, PRODUCT_PRICE } from './constants';
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
  totalPrice: PRODUCT_PRICE * 2,
};

describe('calculateTotalPrice', () => {
  it.each<[number, number]>([
    [1, PRODUCT_PRICE],
    [2, PRODUCT_PRICE * 2],
    [5, PRODUCT_PRICE * 5],
    [10, PRODUCT_PRICE * MAX_QUANTITY],
  ])('returns the right total for quantity %i', (quantity, expected) => {
    expect(calculateTotalPrice(quantity)).toBe(expected);
  });
});

describe('validateFormData', () => {
  it('accepts a complete and valid order payload', () => {
    const result = validateFormData(validData);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('rejects empty required fields', () => {
    const result = validateFormData({
      ...validData,
      name: '',
      city: '',
      area: '',
      street: '',
      building: '',
      paymentMethod: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.city).toBeDefined();
    expect(result.errors.area).toBeDefined();
    expect(result.errors.street).toBeDefined();
    expect(result.errors.building).toBeDefined();
    expect(result.errors.paymentMethod).toBeDefined();
  });

  it('rejects invalid phone numbers and quantities beyond the maximum', () => {
    const result = validateFormData({
      ...validData,
      phone: '1234',
      quantity: MAX_QUANTITY + 1,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeDefined();
    expect(result.errors.quantity).toBeDefined();
  });

  it('allows orders without a landmark', () => {
    const result = validateFormData({
      ...validData,
      landmark: '',
    });

    expect(result.isValid).toBe(true);
  });
});

describe('prepareWhatsAppMessage', () => {
  it('includes the critical order details in the final message', () => {
    const message = prepareWhatsAppMessage(validData);

    expect(message).toContain(validData.name);
    expect(message).toContain(validData.phone);
    expect(message).toContain(String(validData.totalPrice));
    expect(message).toContain(validData.paymentProof as string);
  });

  it('includes payment method in the WhatsApp message', () => {
    const message = prepareWhatsAppMessage(validData);

    expect(message).toContain('فودافون');
    expect(message).toContain('01012345678');
    expect(message).toContain('Sara Ahmed');
  });

  it('handles missing payment proof gracefully', () => {
    const message = prepareWhatsAppMessage({
      ...validData,
      paymentProof: null,
    });

    expect(message).not.toContain('https://example.com/image.jpg');
    expect(message).toContain('يرجى إرسال صورة الإيصال هنا في المحادثة');
  });
});

describe('validateUploadFile', () => {
  it('rejects unsupported image types', () => {
    const result = validateUploadFile({ type: 'application/pdf', size: 1024 } as File);

    expect(result).toBeTruthy();
  });

  it('rejects files larger than 5 MB', () => {
    const result = validateUploadFile({ type: 'image/png', size: 5 * 1024 * 1024 + 1 } as File);

    expect(result).toBeTruthy();
  });

  it('accepts supported image types within the size limit', () => {
    const result = validateUploadFile({ type: 'image/webp', size: 1024 } as File);

    expect(result).toBeNull();
  });
});

describe('uploadImageToCloudinary', () => {
  const originalEnv = { ...process.env };
  const fetchMock = jest.fn();

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'demo-cloud',
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: 'demo-preset',
    };
    fetchMock.mockReset();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('throws when Cloudinary configuration is missing', async () => {
    delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    fetchMock.mockRejectedValue(new Error('Network error'));

    await expect(
      uploadImageToCloudinary(new File(['proof'], 'proof.jpg', { type: 'image/jpeg' }))
    ).rejects.toThrow();
  });

  it('throws when the file type is not supported', async () => {
    await expect(
      uploadImageToCloudinary(new File(['proof'], 'proof.gif', { type: 'image/gif' }))
    ).rejects.toThrow();
  });

  it('uploads successfully when configuration and file are valid', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ secure_url: 'https://example.com/proof.jpg' }),
    });

    const result = await uploadImageToCloudinary(
      new File(['proof'], 'proof.jpg', { type: 'image/jpeg' })
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result).toBe('https://example.com/proof.jpg');
  });
});
