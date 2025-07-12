using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum NationalityEnum
    {
        [Display(Name = "United Kingdom")]
        British = 1,
        [Display(Name = "Ireland")]
        Irish = 2,
        [Display(Name = "Unknown")]
        Unknown = 3,
    }
}
