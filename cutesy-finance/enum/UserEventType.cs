using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum UserEventType
    {
        [Display(Name = "App Download")]
        AppDownload = 1,
        [Display(Name = "Successfull Login")]
        SuccessfullLogin = 2,
    }
}
