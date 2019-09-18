using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Epione.Web.Models
{
    public class SpecialityViewModel
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    public class MotiveViewModel
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    public class DoctorViewModel
    {
           public string firstName { get; set; }
     
        public string address { get; set; }

       
        public string lastName { get; set; }

         public string sexe { get; set; }

        public string civility { get; set; }

      
        public string email { get; set; }
     
        public string password { get; set; }
      
        public string phoneNumber { get; set; }
     
        public string licenseNumber { get; set; }

        public SpecialityViewModel specialty { get; set; }
        public IEnumerable<MotiveViewModel> motives { get; set; }


    }
}