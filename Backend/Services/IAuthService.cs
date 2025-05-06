using Backend.DTOs;

namespace Backend.Services;

public interface IAuthService
{
    Task<AuthResponseDTO> LoginAsync(LoginDTO loginDto);
    Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDto, string role);
    Task<bool> AssignRoleAsync(string email, string roleName);
}