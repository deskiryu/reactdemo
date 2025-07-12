using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum SubscriptionServiceEnum
    {
        [Display(Name = "Insurance Quote")]
        InsuranceQuote = 1,
        [Display(Name = "BrokerIQ")]
        BrokerIQ = 2,
        [Display(Name = "White Label")]
        WhiteLabel = 3,
        [Display(Name = "Your Agent Here (YAH)")]
        YAH = 4,
        [Display(Name = "AI Reader")]
        AIReader = 5,
    }
}