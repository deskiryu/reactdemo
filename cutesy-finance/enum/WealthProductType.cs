using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum WealthProductType
    {
        [Display(Name = "Pension")]
        Pension = 1,
        [Display(Name = "Bonds")]
        Bonds,
        [Display(Name = "ISA")]
        ISA,
        [Display(Name = "Will")]
        Will,
        [Display(Name = "Trust")]
        Trust
    }
}