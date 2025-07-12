using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Linq;

namespace BrokerIQ.Dto.Enum
{
    public enum PaymentMethodEnum
    {
        [Display(Name = "None")]
        None = 0,
        [Display(Name = "Cash")]
        Cash = 1,
        [Display(Name = "Insurer Finance")]
        InsurerFinance = 2,
        [Display(Name = "Third Party Finance")]
        ThirdPartyFinance = 3

    }
}
