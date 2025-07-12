export const MobileNotificationPreferencesEnum = Object.freeze({
  None: 0,
  NewClientRegistered: 1 << 0,
  NewClientEmailVerified: 1 << 1,
  NewClientLoggedIn: 1 << 2,
  ClientDocumentUpload: 1 << 3,
  ClientNewChat: 1 << 4,
  ClientRenewalBrokerReminder: 1 << 5,
  ClientBirthdayVideoBrokerReminder: 1 << 6,
  ClientDateVideoBrokerReminder: 1 << 7,
  NewVideoBrokerVetReminder: 1 << 8,
  All: ~(~0 << 9),
});
