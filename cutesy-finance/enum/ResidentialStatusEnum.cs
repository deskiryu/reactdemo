using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum ResidentialStatusEnum
    {
        [Display(Name = "Homeowner")]
        Homeowner = 1,
        [Display(Name = "Renting Privately")]
        RentingPrivately = 2,
        [Display(Name = "Council Tenant")]
        CouncilTennant = 3,
        [Display(Name = "Living With Parents")]
        LivingWithParents = 4,
        [Display(Name = "Unknown")]
        Unknown = 5
    }
}
