# Sendreen Store - Testing Guide

## Overview
Comprehensive testing guide covering mobile devices, browsers, performance, and accessibility validation.

---

## 1. Mobile Device Testing

### iOS Devices
| Device | Screen Size | Browser | Test Checklist |
|--------|-------------|---------|----------------|
| iPhone 14 | 390x844 | Safari | [ ] Page loads correctly, [ ] Sticky button works, [ ] Form submission, [ ] RTL text display |
| iPhone 14 Pro | 393x852 | Safari | [ ] Page loads correctly, [ ] Sticky button works, [ ] Form submission, [ ] RTL text display |
| iPhone 14 Pro Max | 430x932 | Safari | [ ] Page loads correctly, [ ] Sticky button works, [ ] Form submission, [ ] RTL text display |
| iPhone SE (3rd gen) | 375x667 | Safari | [ ] All content visible, [ ] No horizontal scroll, [ ] Button sizing |
| iPad Mini | 768x1024 | Safari | [ ] Grid layouts, [ ] Testimonial carousel, [ ] Form fields |
| iPad Air | 820x1180 | Safari | [ ] Desktop-like layout, [ ] Touch targets |

### Android Devices
| Device | Screen Size | Browser | Test Checklist |
|--------|-------------|---------|----------------|
| Samsung Galaxy S23 | 360x800 | Chrome | [ ] Page loads correctly, [ ] Sticky button works, [ ] Form validation |
| Samsung Galaxy S24 | 412x915 | Chrome | [ ] Page loads correctly, [ ] Sticky button works, [ ] Form validation |
| Samsung Galaxy S24 Ultra | 412x915 | Chrome | [ ] Large screen optimization, [ ] Touch accuracy |
| Samsung Galaxy A54 | 412x892 | Samsung Internet | [ ] Browser compatibility, [ ] CSS rendering |
| Xiaomi Redmi Note 12 | 393x851 | Chrome | [ ] Budget device performance, [ ] Touch response |
| OnePlus 11 | 412x915 | Chrome | [ ] High-end performance, [ ] Smooth animations |

### Testing Steps for Mobile
1. **Navigation Test**: Navigate through all sections using scroll and bottom nav
2. **Sticky Button Test**: Scroll down and verify button appears/sticks at bottom
3. **Form Completion Test**: Complete full order form from start to WhatsApp redirect
4. **Social Media Links Test**: Tap TikTok and Instagram cards, verify links open correctly
5. **Performance Test**: Check page load time and animation smoothness

---

## 2. Browser Testing

### Desktop Browsers
| Browser | Version | OS | Test Checklist |
|---------|--------|-----|----------------|
| Chrome | Latest (120+) | Windows/macOS | [ ] Full functionality, [ ] DevTools responsive mode |
| Firefox | Latest (121+) | Windows/macOS | [ ] RTL rendering, [ ] Form validation |
| Safari | Latest | macOS/iOS | [ ] CSS gradients, [ ] Flexbox layouts |
| Edge | Latest (120+) | Windows | [ ] Chromium compatibility, [ ] PWA features |

### Browser-Specific Tests
1. **Chrome**:
   - Open DevTools (F12)
   - Test responsive modes (iPhone 14, iPad)
   - Check console for errors
   - Verify network requests (Cloudinary uploads)

2. **Firefox**:
   - Inspect RTL text rendering
   - Check CSS Grid/Flexbox compatibility
   - Verify font loading (Cairo, Noto Naskh Arabic)

3. **Safari**:
   - Check gradient fallback
   - Verify backdrop-filter support
   - Test form input styling

### Cross-Browser Checklist
- [ ] Page loads without errors
- [ ] All buttons are clickable
- [ ] Form validation works
- [ ] Animations play smoothly
- [ ] RTL layout is correct
- [ ] Social media links work
- [ ] No console errors

---

## 3. Accessibility Testing

### Keyboard Navigation
| Element | Key | Expected Behavior |
|---------|-----|-------------------|
| Sticky Order Button | Tab | Button receives focus with visible outline |
| Order Form Fields | Tab/Shift+Tab | Navigate through all inputs |
| Submit Button | Tab + Enter | Form submits |
| Back Button | Tab + Enter | Navigate back |

### Screen Reader Testing (NVDA/JAWS/VoiceOver)
1. **Landmarks**: Verify page has proper `<header>`, `<main>`, `<footer>`
2. **Headings**: All sections have proper h2/h3 hierarchy
3. **Form Labels**: All inputs have associated labels
4. **Error Messages**: Errors are announced by screen reader
5. **Images**: Decorative images have `alt=""`, meaningful images have descriptions

### Color Contrast
- Primary text (#4a2b33 on #fffafa): 9.2:1 ✓
- Secondary text (#8a6c72 on #fffafa): 4.8:1 ✓
- Error text (#b91c1c on white): 5.2:1 ✓

### ARIA Implementation
- [ ] `aria-label` on buttons without text
- [ ] `aria-describedby` for error messages
- [ ] `role="list"` and `role="listitem"` on testimonials
- [ ] `aria-current` on active navigation
- [ ] `aria-live` regions for dynamic content

---

## 4. Performance Testing

### Lighthouse Targets
| Metric | Target | Priority |
|--------|--------|----------|
| Performance | >90 | High |
| Accessibility | >95 | High |
| Best Practices | >90 | Medium |
| SEO | >90 | Medium |

### Performance Checklist
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 4s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Time to Interactive (TTI) < 5s

### Speed Testing Steps
1. **Network Throttling**: Test with "Slow 3G" to simulate mobile conditions
2. **Render Blocking**: Check that fonts and scripts don't block rendering
3. **Image Optimization**: Verify product images are properly sized
4. **Bundle Size**: Check JS/CSS bundle sizes

### Tools for Performance Testing
- **Chrome DevTools**: Performance tab, Network tab
- **Lighthouse**: Run audits in Incognito mode
- **WebPageTest**: Detailed waterfall analysis
- **GTmetrix**: Historical performance tracking

---

## 5. Responsive Design Testing

### Breakpoints
| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | <640px | Single column, stacked elements, sticky bottom nav |
| Tablet | 640px-1024px | Two-column grids where appropriate |
| Desktop | >1024px | Full-width layouts, multi-column sections |

### Responsive Test Cases
1. **320px (Small phones)**: All content fits, no horizontal scroll
2. **375px (iPhone SE)**: Touch targets minimum 44x44px
3. **414px (Large Android)**: Proper spacing between elements
4. **768px (iPad)**: Grid layouts activate
5. **1024px (Small desktop)**: Full navigation visible
6. **1440px (Large desktop)**: Content doesn't stretch too wide

### Test Grid
| Viewport | Width | Height | Device Type |
|----------|-------|--------|-------------|
| Mobile S | 320px | 568px | iPhone 5 |
| Mobile M | 375px | 667px | iPhone SE |
| Mobile L | 414px | 896px | iPhone XR |
| Tablet | 768px | 1024px | iPad Mini |
| Laptop | 1024px | 768px | iPad Air landscape |
| Desktop | 1440px | 900px | Standard monitor |

---

## 6. Order Form Testing

### Form Validation Tests
| Field | Test Input | Expected Error |
|-------|------------|----------------|
| Name | "أ" | "يجب إدخال الاسم الثلاثي" |
| Name | "123" | "يجب أن يحتوي الاسم على أحرف فقط" |
| Phone | "123" | "رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ 01" |
| Phone | "01012345678" | "رقم الهاتف يجب أن يتكون من 11 رقماً ويبدأ بـ 01" |
| Email | "invalid" | "صيغة البريد الإلكتروني غير صحيحة" |
| Governorate | "" | "يجب اختيار المحافظة" |

### Form Submission Tests
1. **Happy Path**: Complete form with valid data → WhatsApp opens
2. **Missing Fields**: Submit with missing required fields → Errors shown
3. **Payment Upload**: Upload receipt image → Check Cloudinary URL
4. **Quantity Limits**: Try to order 11 items → Error shown

### Error Display Tests
- [ ] Error messages appear below invalid fields
- [ ] Error border (red) shows on invalid inputs
- [ ] Error messages are in Arabic
- [ ] Errors clear when user corrects input

---

## 7. Social Media Integration Tests

### TikTok Link Test
1. Click TikTok card
2. Verify new tab opens
3. Confirm TikTok page loads (may require login)

### Instagram Link Test
1. Click Instagram card
2. Verify new tab opens
3. Confirm Instagram page loads (may require login)

### Link Verification
- TikTok: https://www.tiktok.com/@sendreen2?_r=1&_t=ZS-95SbVbBBfIT
- Instagram: https://www.instagram.com/sendreen2?igsh=cjAzYm5ueTcyN3lh&utm_source=qr

---

## 8. Order Status Page Tests

### Lookup Flow
1. Navigate to `/order-status`
2. Enter valid phone number (11 digits starting with 01)
3. Click search
4. Verify order info displays
5. Verify status tracker shows correct state

### Error Cases
- Empty phone: Error "يرجى إدخال رقم الهاتف"
- Invalid format: Error "رقم الهاتف غير صحيح"

### WhatsApp Integration
- Click "تواصل عبر واتساب"
- Verify WhatsApp opens with pre-filled message

---

## 9. Test Execution Checklist

### Pre-Testing Setup
- [ ] Clear browser cache
- [ ] Disable browser extensions
- [ ] Reset mobile network if throttling tested

### Full Test Run
```
□ Mobile Devices (5+ devices)
□ Desktop Browsers (4+ browsers)
□ Accessibility (keyboard + screen reader)
□ Performance (Lighthouse)
□ Responsive (all breakpoints)
□ Forms (validation + submission)
□ Social Links (TikTok + Instagram)
□ Order Status (lookup + errors)
```

### Post-Testing
- [ ] Document any issues found
- [ ] Create bug reports with screenshots
- [ ] Verify fixes on multiple devices

---

## 10. Test Environment Setup

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests (if configured)
npm test

# Build for production
npm run build
```

### Required Environment Variables
```env
NEXT_PUBLIC_ADMIN_WHATSAPP=01158897041
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Production Build
```bash
npm run build
npm start
```

---

## 11. Quick Smoke Test (5 minutes)

For rapid validation, test these critical paths:
1. **Homepage Load**: Check if page renders without errors
2. **Sticky Button**: Scroll to bottom, button should appear
3. **Form Submission**: Complete order with 1 item, verify WhatsApp opens
4. **Social Links**: Click TikTok/Instagram cards
5. **Order Status**: Enter phone number, verify tracking displays

---

## 12. Issue Reporting Template

```markdown
## Issue Description
[Clear description of the bug]

## Environment
- Device: [e.g., iPhone 14]
- Browser: [e.g., Safari 17]
- OS: [e.g., iOS 17]
- Screen Size: [e.g., 390x844]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Screenshots/Video
[Attach visual evidence]

## Severity
- [ ] Critical - blocks purchase
- [ ] High - major functionality broken
- [ ] Medium - feature degraded but works
- [ ] Low - minor cosmetic issue
```

---

## Notes

- Test on real devices when possible; emulators may not accurately reflect performance
- Always test RTL layout on actual Arabic content
- Verify all external links are accessible (not 404)
- Check that Cloudinary uploads work in production environment
- Test with both light and dark mode if applicable