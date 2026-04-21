"use server";

import { validateFormData, prepareWhatsAppMessage } from "./utils";
import { FormData, ActionResult } from "./types";
import { buildWhatsAppUrl, createOrderId } from "./order";
import { PRODUCT_PRICE, ADMIN_WHATSAPP_NUMBER } from "./constants";

// ملاحظة: على Vercel Serverless كل function invocation مستقلة،
// لذا Rate Limiting بـ in-memory لا يعمل بشكل موثوق.
// الحماية الحقيقية تأتي من التحقق على مستوى Zod + Vercel's built-in DDoS protection.

const MOCK_STOCK = 50;

export const submitOrder = async (
  formData: FormData,
): Promise<ActionResult> => {

  // تحقق من صحة البيانات (Zod validation)
  const { isValid, errors } = validateFormData(formData);
  if (!isValid) {
    return { success: false, errors };
  }

  // تصحيح السعر تلقائياً (منع التلاعب)
  const authenticPrice = formData.quantity * PRODUCT_PRICE;
  const finalFormData = { ...formData, totalPrice: authenticPrice };

  // تحقق من الكمية
  if (formData.quantity > MOCK_STOCK) {
    return {
      success: false,
      errors: { submit: `عذراً، نفذت الكمية. المتاح حالياً ${MOCK_STOCK} فقط.` },
    };
  }

  try {
    const orderNumber = createOrderId();

    const finalMessage = prepareWhatsAppMessage(finalFormData);
    const adminWhatsApp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || ADMIN_WHATSAPP_NUMBER;
    const whatsappUrl = buildWhatsAppUrl(adminWhatsApp, finalMessage);

    return {
      success: true,
      whatsappUrl,
      orderId: orderNumber,
      message: "تم إعداد طلبك. جاري التحويل لواتساب...",
    };
  } catch (error) {
    console.error("Order processing error:", error);
    return {
      success: false,
      errors: { submit: "حدث خطأ تقني، يرجى المحاولة لاحقاً." },
    };
  }
};
