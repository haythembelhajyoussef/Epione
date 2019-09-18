using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epione.Domain.Entities
{
    public class DoctolibDoctor
    {
        public string fullName { get; set; }
        public string speciality { get; set; }
        public string address { get; set; }
        public string path { get; set; }
        public string img { get; set; }
        public string latitude { get; set; }
        public string longitude { get; set; }
        public string paymentMethode { get; set; }
        public string ratesRefunds { get; set; }
        public bool bookable { get; set; }
        public string description { get; set; }
        public string tel { get; set; }
        public virtual List<Formation> formations { get; set; }
        public virtual List<Price> prices { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public DoctolibDoctor(string fullName, string speciality, string address, string path)
        {
            this.fullName = fullName;
            this.speciality = speciality;
            this.address = address;
            this.path = path;
        }
        public DoctolibDoctor(string fullName, string speciality, string address, string path,
            string img, string latitude, string longitude, string paymentMethode,
            string ratesRefunds, bool bookable, string description, string tel, List<Formation> formations,
            List<Price> prices)
        {
            this.fullName = fullName;
            this.speciality = speciality;
            this.address = address;
            this.path = path;
            this.img = img;
            this.latitude = latitude;
            this.longitude = longitude;
            this.paymentMethode = paymentMethode;
            this.ratesRefunds = ratesRefunds;
            this.bookable = bookable;
            this.description = description;
            this.tel = tel;
            this.formations = formations;
            this.prices = prices;
        }
        public DoctolibDoctor()
        {

        }
    }
}
