using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum GenderEnum
    {
        [Display(Name = "Unknown")]
        Unknown = 0,
        [Display(Name = "Female")]
        Female = 1,
        [Display(Name = "Male")]
        Male = 2,
    }
}