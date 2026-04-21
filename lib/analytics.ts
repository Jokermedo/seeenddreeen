'use client';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

const ANALYTICS_ENABLED = process.env.NODE_ENV === 'production';

const getGlobalWindow = () => {
  if (typeof window === 'undefined') return null;
  return window as Window & { gtag?: (command: string, eventName: string, params?: Record<string, unknown>) => void };
};

export function trackEvent({ action, category, label, value }: AnalyticsEvent) {
  const win = getGlobalWindow();
  if (!win) return;

  const eventData = {
    event: action,
    eventCategory: category,
    eventLabel: label,
    eventValue: value,
    timestamp: new Date().toISOString(),
    url: win.location.href,
  };

  if (ANALYTICS_ENABLED) {
    if (process.env.NEXT_PUBLIC_GA_ID && win.gtag) {
      win.gtag('event', action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Dev]', eventData);
  }
}

export function trackPageView(pagePath: string) {
  trackEvent({
    action: 'page_view',
    category: 'engagement',
    label: pagePath,
  });
}

export function trackOrderAttempt(quantity: number, totalPrice: number) {
  trackEvent({
    action: 'begin_checkout',
    category: 'conversion',
    label: `qty_${quantity}`,
    value: totalPrice,
  });
}

export function trackOrderSuccess(orderId: string, totalPrice: number) {
  trackEvent({
    action: 'purchase',
    category: 'conversion',
    label: orderId,
    value: totalPrice,
  });
}

export function trackFormError(field: string, errorType: string) {
  trackEvent({
    action: 'form_error',
    category: 'error',
    label: `${field}_${errorType}`,
  });
}

export function trackButtonClick(buttonName: string) {
  trackEvent({
    action: 'button_click',
    category: 'engagement',
    label: buttonName,
  });
}