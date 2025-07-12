using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum MortgageEnum
    {
        [Display(Name = "Repayment")]
        Repayment = 1,
        [Display(Name = "Interest Only")]
        InterestOnly = 2
    }
}
