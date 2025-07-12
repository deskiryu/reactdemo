using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum CustomerCategoryEnum
    {
        [Display(Name = "None chosen", Order = 0)]
        None = 0,
        [Display(Name = "FTB (First time buyer)", Order = 1)]
        FTB = 1,
        [Display(Name = "Re-mortgage", Order = 1)]
        ReMortgage = 2,
        [Display(Name = "House move", Order = 1)]
        HouseMove = 3,
        [Display(Name = "Buy to let", Order = 1)]
        BuyToLet = 4,
        [Display(Name = "Commercial", Order = 1)]
        Commercial = 5,
        [Display(Name = "New Prospect", Order = 0)]
        NewProspect = 6,
        [Display(Name = "Insurance Protection", Order = 2)]
        InsuranceProtection = 7,
        [Display(Name = "Family Benefit", Order = 2)]
        FamilyBenefit = 8,
        [Display(Name = "Current Client", Order = 0)]
        CurrentClient = 9,
        [Display(Name = "Lapsed Client", Order = 0)]
        LapsedClient = 10,
        [Display(Name = "DIP Accepted", Order = 0)]
        DIP = 11,
    }
}
