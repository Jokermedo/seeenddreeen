/**
 * Application-wide constants
 * Centralized configuration to eliminate hardcoded values
 */

// Product configuration
export const PRODUCT_PRICE = 360; // After discount
export const PRODUCT_ADVANCE_PAYMENT = 160; // Pre-payment via Vodafone/InstaPay
export const PRODUCT_CASH_ON_DELIVERY = 200; // Remaining amount on delivery
export const PRODUCT_ORIGINAL_PRICE = 460;
export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 10; // Unified limit (was conflicting 10 vs 20)
export const FREE_SHIPPING_THRESHOLD = 2;

// WhatsApp Configuration
export const ADMIN_WHATSAPP_NUMBER = '201035253389';
export const ADMIN_WHATSAPP_DISPLAY = '01035253389';

// Payment Wallet Numbers
export const VODAFONE_CASH_NUMBER = '01159387704';
export const INSTAPAY_NUMBER = '01159387704';

// UI Configuration
export const TOAST_INITIAL_DELAY = 5000;
export const TOAST_DISPLAY_DURATION = 4000;
export const TOAST_LOOP_INTERVAL = 25000;

// Form configuration
export const FORM_FIELDS = {
  REQUIRED: ['name', 'phone', 'governorate', 'city', 'area', 'street', 'building', 'paymentMethod'],
  OPTIONAL: ['landmark', 'paymentProof']
} as const;

// Validation rules
export const VALIDATION_RULES = {
  NAME_MIN_LENGTH: 3,
  PHONE_PATTERN: /^01[0125]\d{8}$/,
} as const;

// Upload configuration
export const MAX_UPLOAD_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_UPLOAD_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

// Countdown timer configuration
export const COUNTDOWN_INITIAL = {
  hours: 4,
  minutes: 12,
  seconds: 59
};
