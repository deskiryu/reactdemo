using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum ServicesEnum
    {
        [Display(Name = "Personal Insurance")]
        PersonalInsurance = 1,
        [Display(Name = "Business Insurance")]
        BusinessInsurance,
        [Display(Name = "Mortgage")]
        Mortgage,
        [Display(Name = "Wealth")]
        Wealth
    }
}
