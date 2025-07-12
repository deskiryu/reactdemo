using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum ProfilingOptionEnum
    {
        // Potential sales
        [Display(Name = "Without Income Protection")]
        WithoutIncomeProtection = 1,
        [Display(Name = "Without Life Insurance")]
        WithoutLifeInsurance,
        [Display(Name = "Without Life And CI Insurance")]
        WithoutLifeAndCriticalIlnessInsurance,
        [Display(Name = "Without Home Insurance")]
        WithoutHomeInsurance,
        [Display(Name = "Without Mortgage Protection")]
        WithoutMortgageProtection,
        [Display(Name = "Without Family Income Benefits")]
        WithoutFamilyIncomeBenefits,
        [Display(Name = "Without Health")]
        WithoutHealth,

        // Mortage & Protection
        [Display(Name = "Self employed, mortgage, has no protection")]
        SelfEmployedMortgageNoProtection,
        [Display(Name = "Self employed, mortgage, Life and CI, no IP")]
        SelfEmployedMortgageLifeCINoIP,
        [Display(Name = "Self employed, mortgage, Life, no CI or IP")]
        SelfEmployedMortgageLifeNoCINoIP,
        [Display(Name = "Self employed, mortgage, CI, no Income Protection or Life ")]
        SelfEmployedMortgageCINoLifeNoIP,
        [Display(Name = "Self employed, mortgage, CI and IP, no Life ")]
        SelfEmployedMortgageCIIPNoLife,
        [Display(Name = "Self employed, mortgage, IP, no CI or Life ")]
        SelfEmployedMortgageIPNoLifeNoCI,

        [Display(Name = "Employed, mortgage, no protection")]
        EmployedMortgageNoProtection,
        [Display(Name = "Employed, mortgage, has Life, no CI ")]
        EmployedMortgageHasLifeNoCriticalIlness,
        [Display(Name = "Employed, mortgage, has CI, no Life ")]
        EmployedMortgageHasCriticalIlnessNoLife,

        // Wealth
        [Display(Name = "Pension, no goals")]
        PensionNoGoals,
        [Display(Name = "Pension/investment, no protection")]
        PensionOrInvestmentNoProtection,
        [Display(Name = "Pension/investment, Life, no IP")]
        PensionOrInvestmentLifeNoIP,
        [Display(Name = "Pension/investment, IP, no Life")]
        PensionOrInvestmentIPNoLife,
        [Display(Name = "High net worth, no Will or Trust")]
        HightNetWorthNoWillNorTrust,
    }
}