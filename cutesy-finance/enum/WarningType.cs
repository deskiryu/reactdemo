using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum WarningType
    {
        // Mortage & Protection warnings
        [Display(Name = "Customer is self employed, has mortgage, but does not have protection")]
        SelfEmployedMortgageNoProtection = 1,
        [Display(Name = "Customer is self employed, has mortgage, Life and Critical Illness cover, but not Income Protection cover")]
        SelfEmployedMortgageLifeCINoIP,
        [Display(Name = "Customer is self employed, has mortgage, Life cover, but not Critical Illness or Income Protection cover")]
        SelfEmployedMortgageLifeNoCINoIP,
        [Display(Name = "Customer is self employed, has mortgage, Critical Illness cover, but not Income Protection or Life cover")]
        SelfEmployedMortgageCINoLifeNoIP,
        [Display(Name = "Customer is self employed, has mortgage, Critical Illness and Income Protection cover, but no Life cover")]
        SelfEmployedMortgageCIIPNoLife,
        [Display(Name = "Customer is self employed, has mortgage, Income Protection cover, but no Critical Illness or Life cover")]
        SelfEmployedMortgageIPNoLifeNoCI,

        [Display(Name = "Customer is employed, has mortgage, but does not have protection")]
        EmployedMortgageNoProtection,
        [Display(Name = "Customer is employed, has mortgage, has Life cover, but not Critical Ilness cover")]
        EmployedMortgageHasLifeNoCriticalIlness,
        [Display(Name = "Customer is employed, has mortgage, has Critical Ilness cover, but not Life cover")]
        EmployedMortgageHasCriticalIlnessNoLife,

        // Wealth warnings
        [Display(Name = "Customer has a pension, but has no goals")]
        PensionNoGoals,
        [Display(Name = "Customer has pension/investment, but no protection")]
        PensionOrInvestmentNoProtection,
        [Display(Name = "Customer has pension/investment, has Life cover, but no Income Protection cover")]
        PensionOrInvestmentLifeNoIP,
        [Display(Name = "Customer has pension/investment, has Income Protection cover, but no Life cover")]
        PensionOrInvestmentIPNoLife,
        [Display(Name = "Customer is high net worth, but does not have Will or Trust")]
        HightNetWorthNoWillNorTrust,
    }
}
