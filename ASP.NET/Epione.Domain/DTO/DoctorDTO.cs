using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Epione.Domain.DTO
{
    public class SpecialtyDTO
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    public class MotiveDTO
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    public class  DoctorDTO
    {
        public int id { get; set; }
        public string firstName { get; set; }

        public string address { get; set; }
        public string photo { get; set; }


        public string lastName { get; set; }

         public string sexe { get; set; }

        public string civility { get; set; }

      
        public string email { get; set; }
     
        public string password { get; set; }
      
        public string phoneNumber { get; set; }
     
        public string licenseNumber { get; set; }

        public SpecialtyDTO specialty { get; set; }
        public IEnumerable<MotiveDTO> motives { get; set; }


    }
}