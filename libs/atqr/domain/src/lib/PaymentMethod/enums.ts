enum PaymentFundsStatus {
  Unverified = 'Unverified',
  Authorized = 'Authorized',
  Denied = 'Denied',
}
/**
 * The status of a challenge payment.
 * Here's
 */
enum PaymentStatus {
  NotDueYet = 'NotDueYet',
  Defaulted = 'Defaulted',
  Failed = 'Failed',
  Forgiven = 'Forgiven',
  Paid = 'Paid',
  Pending = 'Pending',
  Refunded = 'Refunded',
  RefundRequested = 'RefundRequested',
}

enum PaymentMethodType {
  CreditCard = 'CreditCard',
  DebitCard = 'DebitCard',
}
