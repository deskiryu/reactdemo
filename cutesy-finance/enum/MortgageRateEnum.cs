using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum MortgageRateEnum
    {
        [Display(Name = "Fixed")]
        Fixed = 1,
        [Display(Name = "Standard Variable")]
        StandardVariable = 2,
        [Display(Name = "Discounted")]
        Discounted = 3,
        [Display(Name = "Tracker")]
        Tracker = 4,
        [Display(Name = "Capped")]
        Capped = 5,
        [Display(Name = "Flexible")]
        Flexible = 6,
        [Display(Name = "Offset")]
        Offset = 7
    }
}
