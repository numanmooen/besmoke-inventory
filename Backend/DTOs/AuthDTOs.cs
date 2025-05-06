namespace Backend.DTOs;

public class LoginDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class RegisterDTO
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

public class AuthResponseDTO
{
    public string Token { get; set; }
    public DateTime Expiration { get; set; }
    public string UserId { get; set; }
    public string Email { get; set; }
    public string FullName { get; set; }
    public IList<string> Roles { get; set; }
}

public class AssignRoleDTO
{
    public string Email { get; set; }
    public string RoleName { get; set; }
}