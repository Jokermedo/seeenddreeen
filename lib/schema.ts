import { z } from "zod";
import { egyptLocations, governorates } from "./egypt-locations";

export const orderSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "يجب إدخال الاسم الثلاثي")
      .regex(/^[\p{L}\s]+$/u, "يجب أن يحتوي الاسم على أحرف فقط"),
    phone: z
      .string()
      .regex(
        /^01[0125]\d{8}$/,
        "رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ 01",
      ),
    email: z
      .string()
      .email("صيغة البريد الإلكتروني غير صحيحة")
      .optional()
      .or(z.literal("")),
    governorate: z.enum(governorates as [string, ...string[]], {
      message: "يجب اختيار المحافظة لتحديد مصاريف الشحن",
    }),
    city: z.string().min(1, "اختر مدينتك من القائمة المتاحة"),
    area: z.string().min(2, "يرجى تحديد المنطقة / الحي"),
    street: z.string().min(3, "اسم الشارع مطلوب (أكثر من 3 أحرف)"),
    building: z.string().min(1, "يرجى تحديد رقم العمارة أو تحديد 'لا يوجد'"),
    landmark: z.string().optional(),
    paymentMethod: z.enum(["vodafone", "instapay"], {
      message: "يرجى اختيار طريقة الدفع المتاحة",
    }),
    paymentProof: z.string().nullable().optional(),
    transferNumber: z
      .string()
      .regex(
        /^01[0125]\d{8}$/,
        "رقم المحول يجب أن يتكون من 11 رقماً ويبدأ بـ 01",
      ),
    transferName: z.string().min(3, "يرجى إدخال اسم المحول (الاسم المسجل بالمحفظة)"),
    quantity: z.number().int().min(1).max(10, "أقصى كمية مسموحة 10 قطع"),
    orderNotes: z
      .string()
      .max(200, "الملاحظات يجب ألا تتجاوز 200 حرف")
      .optional()
      .or(z.literal("")),
    totalPrice: z.number().min(0),
  })
  .refine(
    (data) => {
      const validCities =
        egyptLocations[data.governorate as keyof typeof egyptLocations] || [];
      return validCities.includes(data.city);
    },
    {
      message: "المدينة غير متوفرة في المحافظة المختارة، يرجى تحديث الاختيار",
      path: ["city"],
    },
  )

  .refine(
    (data) => {
      // Require transfer details
      if (["vodafone", "instapay"].includes(data.paymentMethod)) {
        return !!data.transferNumber && !!data.transferName;
      }
      return true;
    },
    {
      message: "يجب إدخال بيانات التحويل (رقم المحول واسم المحول)",
      path: ["transferNumber"],
    },
  )
  // إزالة إجبارية رفع الإيصال - يصبح اختياري ويمكن إرساله على الواتساب مباشرة



export type OrderSchemaType = z.infer<typeof orderSchema>;
