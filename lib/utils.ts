import { FormData, ValidationResult, getFullAddress } from "./types";
import { orderSchema } from "./schema";
import {
  ALLOWED_UPLOAD_IMAGE_TYPES,
  MAX_UPLOAD_FILE_SIZE_BYTES,
  PRODUCT_PRICE,
  PRODUCT_ADVANCE_PAYMENT,
  PRODUCT_CASH_ON_DELIVERY,
} from "./constants";

/**
 * Check if a string value is empty or only whitespace
 */
export const isEmpty = (value: string | null | undefined): boolean => {
  return !value || value.trim() === "";
};

/**
 * Calculate total price based on quantity and base price
 * Base price after discount: 360 ج.م (originally 460 ج.م)
 */
export const calculateTotalPrice = (quantity: number): number => {
  return PRODUCT_PRICE * quantity;
};

export const validateUploadFile = (
  file: Pick<File, "size" | "type">,
): string | null => {
  if (
    !ALLOWED_UPLOAD_IMAGE_TYPES.includes(
      file.type as (typeof ALLOWED_UPLOAD_IMAGE_TYPES)[number],
    )
  ) {
    return "نوع الملف غير مدعوم. يرجى رفع صورة JPG أو PNG أو WEBP.";
  }

  if (file.size > MAX_UPLOAD_FILE_SIZE_BYTES) {
    return "حجم الصورة كبير جداً. الحد الأقصى 5 ميجابايت.";
  }

  return null;
};

/**
 * Prepare WhatsApp message template with form data
 * Formatted for easy reading in WhatsApp
 */
export const prepareWhatsAppMessage = (data: FormData): string => {
  const fullAddress = getFullAddress(data);
  const paymentMethodLabel =
    data.paymentMethod === "vodafone" ? "فودافون كاش" : "إنستا باي";

  const lines: string[] = [
    "🌟 *طلب جديد - دفع مسبق للحجز* 🌟",
    "",
    `📦 *المنتج:* سيروم الجمال`,
    `🔢 *الكمية:* ${data.quantity} قطعة`,
    `💰 *الإجمالي:* ${data.totalPrice} ج.م`,
    `💳 *مبلغ الحجز المطلوب تحويله:* ${data.quantity * PRODUCT_ADVANCE_PAYMENT} ج.م`,
    `💵 *المبلغ المتبقي عند الاستلام:* ${data.quantity * PRODUCT_CASH_ON_DELIVERY} ج.م`,
    "",
    "👤 *بيانات العميل:*",
    `• الاسم: ${data.name}`,
    `• الموبايل: ${data.phone}`,
  ];

  if (data.email) lines.push(`• الإيميل: ${data.email}`);

  lines.push(
    "",
    "📍 *عنوان الشحن:*",
    `• ${fullAddress}`,
    "",
    "💳 *بيانات الدفع:*",
    `• الطريقة: ${paymentMethodLabel}`,
    `• رقم المحول: ${data.transferNumber}`,
    `• اسم المحول: ${data.transferName}`,
  );

  if (data.paymentProof) {
    lines.push(`• إيصال التحويل: ${data.paymentProof}`);
  } else {
    lines.push(`• ⚠️ إيصال التحويل: يرجى إرسال صورة الإيصال هنا في المحادثة شكراً لك ✅`);
  }

  if (data.orderNotes?.trim()) {
    lines.push("", `📝 *ملاحظات:* ${data.orderNotes.trim()}`);
  }

  return lines.join("\n");
};

/**
 * Validate form data with comprehensive checks
 */
export const validateFormData = (data: Partial<FormData>): ValidationResult => {
  const result = orderSchema.safeParse(data);

  if (result.success) {
    return { isValid: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue: import("zod").ZodIssue) => {
    const path = issue.path[0] as string;
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });

  return { isValid: false, errors };
};

/**
 * Upload image to Cloudinary
 */
export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const cloudName =
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) || "dnfjt8o5e";
  const uploadPreset =
    (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) || "sendreen_preset";
  const uploadError = validateUploadFile(file);

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing.");
  }

  if (uploadError) {
    throw new Error(uploadError);
  }

  const browserFormData = new globalThis.FormData();
  browserFormData.append("file", file);
  browserFormData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: browserFormData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const responseData = await response.json();
  return responseData.secure_url;
};
