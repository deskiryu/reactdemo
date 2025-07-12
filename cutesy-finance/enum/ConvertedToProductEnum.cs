using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Linq;

namespace BrokerIQ.Dto.Enum
{
    public enum ConvertedToProductEnum
    {
        [Display(Name = "Not contacted yet")]
        NotContactedYet = 0,
        [Display(Name = "Contacted and no response")]
        ContactedNoReponse = 1,
        [Display(Name = "Contacted and response")]
        ContactedResponded = 2,
        [Display(Name = "Got the business")]
        GotTheBusiness =3,
        [Display(Name = "Did not get the business")]
        DidNotGetTheBusiness = 4,
    }
}
