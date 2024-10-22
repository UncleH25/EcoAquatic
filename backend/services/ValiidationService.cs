using System.Text.RegularExpressions;

public class ValidationService
{
    public bool IsEmailValid(string email)
    {
        return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
    }

    public bool IsPasswordValid(string password)
    {
        // You can set password strength criteria here
        return password.Length >= 6;
    }
}
