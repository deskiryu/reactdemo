using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BrokerIQ.Dto.Enum
{
    public enum OperatingSystemEnum
    {
        [Display(Name = "Apple")]
        iOS =1,
        [Display(Name = "Android")]
        Android =2
    }
}
