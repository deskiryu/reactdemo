using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum ReminderTargetEnum
    {
        [Display(Name = "Customer")]
        Customer = 1,
        [Display(Name = "Broker")]
        Broker = 2
    }
}