using EcoAquatic.Models;
using Microsoft.AspNetCore.Identity;

public class AuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<ApplicationUser> FindByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user ?? throw new InvalidOperationException("User not found");
    }

    public async Task<bool> CheckPasswordAsync(ApplicationUser user, string password)
    {
        return await _userManager.CheckPasswordAsync(user, password);
    }
}
