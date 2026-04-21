/**
 * Centralized Type Definitions for Sendreen Beauty
 * Last Updated: 2026-04-11
 */

/**
 * Supported payment methods
 */
export type PaymentMethod = "vodafone" | "instapay" | "";

/**
 * Order status for tracking and database synchronization
 */
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

/**
 * Main form data interface for user input
 */
export interface FormData {
  name: string;
  phone: string;
  email?: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  building: string;
  landmark: string;
  paymentMethod: PaymentMethod;
  paymentProof: string | null;
  transferNumber: string;
  transferName: string;
  quantity: number;
  totalPrice: number;
  orderNotes?: string;
}

/**
 * Helper to construct full address string from form data
 */
export const getFullAddress = (data: FormData): string => {
  const parts = [
    data.governorate,
    data.city,
    data.area,
    data.street,
    data.building,
    data.landmark,
  ].filter(Boolean);
  return parts.join(" - ");
};



/**
 * Order entity representation (Database Ready)
 */
export interface Order extends FormData {
  id: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  source: "web" | "mobile" | "whatsapp";
}

/**
 * Action result structure for consistent error handling
 */
export interface ActionResult {
  success: boolean;
  message?: string;
  whatsappUrl?: string;
  errors?: Record<string, string>;
  orderId?: string;
}

/**
 * Validation context
 */
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
