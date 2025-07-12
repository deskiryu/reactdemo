using System.ComponentModel.DataAnnotations;

namespace BrokerIQ.Dto.Enum
{
    public enum ReminderTypeEnum
    {
        [Display(Name = "Insurance")]
        Insurance = 1,
        [Display(Name = "Mortgage")]
        Mortgage = 2,
        [Display(Name = "Profiling")]
        Profiling = 3,
        [Display(Name = "Appointment")]
        Appointment = 4,
        [Display(Name = "Notes")]
        Notes = 5,
        [Display(Name = "Wealth")]
        Wealth = 6
    }
}