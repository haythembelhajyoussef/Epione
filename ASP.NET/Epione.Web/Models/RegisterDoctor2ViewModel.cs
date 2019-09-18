using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Epione.Web.Models
{
    public class RegisterDoctor2ViewModel
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required]
        [StringLength(15, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 3)]
        [Display(Name = "Code")]
        public string Code { get; set; }


        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mot de Passe")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirmer mot de passe")]
        [Compare("Password", ErrorMessage = "Le mot de passe ne correspond pas.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone")]
        public string Phone { get; set; }

        [Required]
        [Display(Name = "Sexe")]
        public string Sexe { get; set; }


        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 2)]
        [DataType(DataType.Text)]
        [Display(Name = "City")]
        public string City { get; set; }


        [Required]
        [StringLength(100, ErrorMessage = "The {0} Must be at least {2} characters.", MinimumLength = 10)]
        [DataType(DataType.Text)]
        [Display(Name = "Street")]
        public string Street { get; set; }
        [Required]
        [Display(Name = "Specialty")]
        public string Specialty { get; set; }
    }
}