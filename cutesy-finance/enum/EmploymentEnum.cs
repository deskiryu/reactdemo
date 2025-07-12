using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BrokerIQ.Dto.Enum
{
    public enum EmploymentEnum
    {
        [Display(Name = "Employed")]
        Employed =1,
        [Display(Name = "Self Employed")]
        SelfEmployed =2,
        [Display(Name = "Temporary Worker")]
        TemporaryWorker =3,
        [Display(Name = "Contract Worker")]
        ContractWorker =4,
        [Display(Name = "Unemployed")]
        Unemployed =5,
        [Display(Name = "Retired")]
        Retired =6,
        [Display(Name = "Student")]
        Student =7,
        [Display(Name = "Homemaker")]
        Homemaker =8,
        [Display(Name = "Other")]
        Other =9                     
    }
}
