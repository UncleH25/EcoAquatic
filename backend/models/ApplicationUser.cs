using Microsoft.AspNetCore.Identity;

namespace EcoAquatic.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? InstituteName { get; set; }
        public required string FullName { get; set; }
        public new required string Email { get; set; }
        public required string Password { get; set; }
    }
}
