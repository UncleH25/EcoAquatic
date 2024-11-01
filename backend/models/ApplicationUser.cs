using Microsoft.AspNetCore.Identity;

namespace EcoAquatic.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? InstituteName { get; set; }
        public required string FullName { get; set; }
    }
}

