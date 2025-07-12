using System.ComponentModel.DataAnnotations;
namespace BrokerIQ.Dto.Enum
{
    public enum TermTypeEnum
    {
        [Display(Name = "None")]
        None = 0,
        [Display(Name = "Decreasing")]
        Decreasing = 1,
        [Display(Name = "Index")]
        Fixed = 2,
        [Display(Name = "Level")]
        Level = 3
    }
}
