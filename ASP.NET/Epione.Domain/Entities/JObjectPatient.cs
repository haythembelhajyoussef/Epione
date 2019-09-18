using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epione.Domain.Entities
{
    public class JObjectPatient
    {
        public string fullName { get; set; }
        public string AppointmentDate { get; set; }
        public string AppointmentStatus { get; set; }
        public string diagnosedBefore { get; set; }

        public JObjectPatient(string fullName, string AppointmentDate, string AppointmentStatus, string diagnosedBefore)
        {
            this.fullName = fullName;
            this.AppointmentDate = AppointmentDate;
            this.AppointmentStatus = AppointmentStatus;
            this.diagnosedBefore = diagnosedBefore;
        }
    }
}
