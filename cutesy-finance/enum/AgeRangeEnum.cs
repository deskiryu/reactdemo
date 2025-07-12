using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BrokerIQ.Dto.Enum
{
    public enum AgeRangeEnum
    {
        [Display(Name = "None chosen")]
        None = 0,
        [Display(Name = "18 to 24")]
        _18to24 = 1,
        [Display(Name = "25 to 29")]
        _25to29 = 2,
        [Display(Name = "30 to 34")]
        _30to34 = 3,
        [Display(Name = "35 to 39")]
        _35to39 = 4,
        [Display(Name = "40 to 44")]
        _40to44 = 5,
        [Display(Name = "45 to 49")]
        _45to49 = 6,
        [Display(Name = "50 to 54")]
        _50to54 = 7,
        [Display(Name = "55 to 54")]
        _55to59 = 8,
        [Display(Name = "60 to 65")]
        _60to64 = 9,
        [Display(Name = "65+")]
        _65plus = 10,
    }
}
