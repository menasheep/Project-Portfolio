using System.ComponentModel.DataAnnotations;


// ViewModels -- validation structure for use w/Entity Framework//
// Validations will be run using the RegisterViewModel.



namespace Wall.Models
{
    public class RegisterViewModel : BaseEntity
    {
        [Required]
        [MinLength(2)]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Sorry -- Your first name can only contain letters")]
        public string FirstName { get; set; }


        [Required]
        [MinLength(2)]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Sorry -- Your last name can only contain letters")]
        public string LastName { get; set; }


        [Required]
        [EmailAddress]
        public string Email { get; set; }


        [Required(ErrorMessage = "Your password must be at least 6 characters long.")]
        [MinLength(6)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        

        [Compare("Password", ErrorMessage = "Password and confirmation must match.")]
        public string PasswordConfirmation { get; set; }
    }
}


// Notice that the ViewModel doesn't contain an Id field or CreatedAt and UpdatedAt. This is because these fields are only needed when retrieving information from the database.

// The ViewModel will be bound to our View and used to generate the form. When the form submits our backend receives a RegisterViewModel and runs all the associated validations. If all of the validations pass we know its data is safe and valid to use to construct a User object that matches our database table.

