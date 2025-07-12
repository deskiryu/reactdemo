using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum DocuVaultTypeEnum
    {
        [Display(Name = "Profile Picture",
                 Prompt = "Personalise")]
        ProfilePicture = 1,
        [Display(Name = "Passport",
                 Prompt = "Both back pages of a valid passport")]
        Passport = 2,
        [Display(Name = "Driving License",
                 Prompt = "Front and back of valid license with current address")]
        DrivingLicense = 3,
        [Display(Name = "Utility Bill",
                 Prompt = "For address verification")]
        UtilityBill = 4,
        [Display(Name = "Bank Statement",
                 Prompt = "Last 3 months bank statements")]
        BankStatement = 5,
        [Display(Name = "Payslip",
                 Prompt = "Last 3 monthly statements or 13 weekly statements")]
        Payslip = 6,
        [Display(Name = "Credit Report",
                 Prompt = "Experion or other recent credit report")]
        Creditreport = 7,
        [Display(Name = "P60",
                 Prompt = "")]
        P60 = 8,
        [Display(Name = "Self Employed Earnings",
                 Prompt = "SA 302 statements")]
        SA302 = 9,
        [Display(Name = "Savings Statement",
                 Prompt = "Last 3 monthly statements")]
        Savings = 10,
        [Display(Name = "Tax Overview",
                 Prompt = "Last two years")]
        TaxOverview = 11,
        [Display(Name = "Mortgage Statement",
                 Prompt = "Recent mortgage statement")]
        MortgageStatement = 12,
        [Display(Name = "Fact Find",
                 Prompt = "Results of a fact find")]
        FactFind = 13,
        [Display(Name = "Benefits Information",
                 Prompt = "Most recent benefits information")]
        BenefitsInformation = 14,
        [Display(Name = "Miscellaneous",
                 Prompt = "Miscellaneous")]
        Miscellaneous = 15,
        [Display(Name = "Business bank statement",
                 Prompt = "Business bank statement")]
        BusinessBankStatement = 16,
        [Display(Name = "Tax calculation",
                 Prompt = "Tax calculation")]
        TaxCalculation = 17,
        [Display(Name = "Full business accounts",
                 Prompt = "Full business accounts")]
        FullBusinessAccounts = 18,
        [Display(Name = "Tenancy agreement",
                 Prompt = "Tenancy agreement")]
        TenancyAgreement = 19,
    }
}
