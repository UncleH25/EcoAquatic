public class RegisterModel
{
    public string? InstituteName { get; set; } 
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}