
using System.ComponentModel.DataAnnotations;
namespace Epione.Domain.DTO
{
    public class DoctorRegisterDTO
    {
        [Required]
        [StringLength(15, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "First Name")]

        public string firstName { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 10)]
        [DataType(DataType.Text)]
        [Display(Name = "Street")]

        public string address { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "Last Name")]

        public string lastName { get; set; }

        [Required]
        [Display(Name = "Sexe")]
        public string sexe { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 2)]
        [DataType(DataType.Text)]
        [Display(Name = "City")]
        public string civility { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]

        public string email { get; set; }
        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de Passe")]

        public string password { get; set; }
        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone")]

        public string phoneNumber { get; set; }
        [Required]
        [StringLength(20, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "Code")]

        public string licenseNumber { get; set; }

        public DoctorRegisterSpecialtyDTO specialty { get; set; }





    }
}