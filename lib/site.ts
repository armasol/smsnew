export function publicPhone() {
  return process.env.PUBLIC_PHONE_NUMBER || '';
}

export function publicPhoneDisplay() {
  return process.env.PUBLIC_PHONE_DISPLAY || process.env.PUBLIC_PHONE_NUMBER || 'Number available at launch';
}

export function smsHref(message = 'LAUNCH') {
  const phone = publicPhone();
  return phone ? `sms:${phone}?&body=${encodeURIComponent(message)}` : '#how-it-works';
}
