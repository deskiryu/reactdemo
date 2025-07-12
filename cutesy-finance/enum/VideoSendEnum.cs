using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum VideoSendEnum
    {
        [Display(Name = "Not assigned")]
        NotAssigned = 0,
        [Display(Name = "Send on this date")]
        SendOnDate = 1,
        [Display(Name = "Birthday video")]
        BirthdayVideo = 2,
        [Display(Name = "Mortgage video")]
        MortgageVideo = 3,
        [Display(Name = "Welcome video")]
        WelcomeVideo = 4,
        [Display(Name = "Insurance video")]
        InsuranceVideo = 5,
    }
}