using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum InsuranceEnum
    {
        [Display(Name = "Car", Order = 5)]
        Car = 1,
        [Display(Name = "Home", Order = -1)]
        Home = 2,
        [Display(Name = "Life", Order = -10)]
        Life = 3,
        [Display(Name = "Life and Critical Illness", Order = -9)]
        Illness = 4,
        [Display(Name = "Pet", Order = 11)]
        Pet = 5,
        [Display(Name = "Income Protection", Order = -8)]
        Income = 6,
        [Display(Name = "Health", Order = -4)]
        Health = 7,
        [Display(Name = "Van", Order = 6)]
        Van = 8,
        [Display(Name = "Travel", Order = 8)]
        Travel = 9,
        [Display(Name = "HGV", Order = 9)]
        HGV = 10,
        [Display(Name = "Business", Order = 0)]
        Business = 11,
        [Display(Name = "Buildings", Order = 3)]
        Buildings = 12,
        [Display(Name = "Key Person", Order = 4)]
        Keyman = 13,
        [Display(Name = "Tradesman", Order = 1)]
        Tradesman = 14,
        [Display(Name = "Caravan", Order = 7)]
        Caravan = 15,
        [Display(Name = "Landlord", Order = 2)]
        Landlord = 16,
        [Display(Name = "Mobile Phone", Order = 10)]
        MobilePhone = 17,
        [Display(Name = "Mortgage Protection", Order = -3)]
        MortgageProtection = 18,
        [Display(Name = "Family Income Benefit", Order = -5)]
        FamilyIncomeBenefit = 19,
        [Display(Name = "Critical Illness", Order = -7)]
        CriticalIllness = 20,
        [Display(Name = "Children's critical illness", Order = -6)]
        ChildrensCriticalIllness = 21,
        [Display(Name = "Accident", Order = -2)]
        Accident = 22,
        [Display(Name = "Value Added Services", Order = 12)]
        ValueAddedServices = 23,

        [Display(Name = "Professional Indemnity", Order = 0)]
        ProfessionalIndemnity = 1001,
        [Display(Name = "Cyber & Privacy Liability", Order = 0)]
        CyberAndPrivacyLiability = 1002,
        [Display(Name = "Management Liability", Order = 0)]
        ManagementLiability = 1003,
        [Display(Name = "Business Combined ", Order = 0)]
        BusinessCombined = 1004,
        [Display(Name = "Buildings & Property Owners Liability", Order = 0)]
        BuildingsAndPropertyOwnersLiability = 1005,
        [Display(Name = "Trade Credit ", Order = 0)]
        TradeCredit = 1006,
        [Display(Name = "Group Personal Accident & Travel ", Order = 0)]
        GroupPersonalAccidentAndTravel = 1007,
        [Display(Name = "Events", Order = 0)]
        Events = 1008,
        [Display(Name = "Excess of Loss - Professional Indemnity ", Order = 0)]
        ExcessofLossProfessionalIndemnity = 1009,
        [Display(Name = "Excess of Loss - Public Liability ", Order = 0)]
        ExcessofLossPublicLiability = 1010,
        [Display(Name = "Excess of Loss – Employers Liability", Order = 0)]
        ExcessofLossEmployersLiability=1011,
        [Display(Name = "Commercial Combined ", Order = 0)]
        CommercialCombined = 1012,
        [Display(Name = "Healthcare Combined   ", Order = 0)]
        HealthcareCombined = 1013,
        [Display(Name = "Property ", Order = 0)]
        Property = 1014,
        [Display(Name = "Legal Expenses ", Order = 0)]
        LegalExpenses = 1015,
        [Display(Name = "Motor Fleet  ", Order = 0)]
        MotorFleet = 1016,
        [Display(Name = "Loss Recovery ", Order = 0)]
        LossRecovery = 1017,
        [Display(Name = "Plant & Machinery ", Order = 0)]
        PlantAndMachinery = 1018,
        [Display(Name = "Public & Products Liability ", Order = 0)]
        PublicAndProductsLiability = 1019,
        [Display(Name = "Professional Indemnity Combined ", Order = 0)]
        ProfessionalIndemnityCombined = 1020,
        [Display(Name = "Run Off – Professional Indemnity  ", Order = 0)]
        RunOffProfessionalIndemnity = 1021,
        [Display(Name = "Terrorism", Order = 0)]
        Terrorism = 1022,

        [Display(Name = "Shareholder Protection ", Order = -1)]
        ShareholderProtection = 1023,
        [Display(Name = "Relevant Life Plan ", Order = -1)]
        RelevantLifePlan = 1024,
        [Display(Name = "Executive Income Protection ", Order = -1)]
        ExecutiveIncomeProtection = 1025,
        [Display(Name = "Key Person Business ", Order = -1)]
        KeyPersonBusiness = 1026,

    }
}
