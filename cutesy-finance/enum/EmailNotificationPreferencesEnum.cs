using System;
using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    [Flags]
    public enum EmailNotificationPreferencesEnum
    {
        [Display(Name = "None",
        Prompt = "No email Notifications")]
        None = 0,
        [Display(Name = "New Client Registered",
        Prompt = "Email when a new client first registers on the app")]
        NewClientRegistered = 1 << 0,
        [Display(Name = "New Client Email Verified",
        Prompt = "Email when a client verifies their email address")]
        NewClientEmailVerified = 1 << 1,
        [Display(Name = "New Client Logged In",
        Prompt = "Email when a client logs in to the app for the first time")]
        NewClientLoggedIn = 1 << 2,
        [Display(Name = "Client Document Upload",
        Prompt = "Email when a client uploads a document")]
        ClientDocumentUpload = 1 << 3,
        [Display(Name = "Client New Chat",
        Prompt = "Email when a client sends a chat message")]
        ClientNewChat = 1 << 4,
        [Display(Name = "Client Renewal Broker Reminder",
        Prompt = "Get email reminders about upcoming client renewals")]
        ClientRenewalBrokerReminder = 1 << 5,
        [Display(Name = "Client Birthday Video Broker Reminder",
        Prompt = "Get emails when a birthday video has been sent to clients")]
        ClientBirthdayVideoBrokerReminder = 1 << 6,
        [Display(Name = "Client Date Video Broker Reminder",
        Prompt = "Get emails when a special date video has been sent to clients")]
        ClientDateVideoBrokerReminder = 1 << 7,
        [Display(Name = "Broker Vet Video",
        Prompt = "Admin broker gets email reminder to vet video")]
        NewVideoBrokerVetReminder = 1 << 8,
        [Display(Name = "All",
        Prompt = "All email notification")]
        All = ~(~0 << 9)
    }
}
