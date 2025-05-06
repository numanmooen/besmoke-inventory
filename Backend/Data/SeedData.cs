using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public static class Seed
{
    public static async Task SeedData(
        BesmokeDbContext context,
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager)
    {
        await SeedRoles(roleManager);
        await SeedAdminUser(userManager);
        await SeedProducts(context);
    }

    private static async Task SeedRoles(RoleManager<ApplicationRole> roleManager)
    {
        if (!await roleManager.RoleExistsAsync("Admin"))
        {
            await roleManager.CreateAsync(new ApplicationRole("Admin"));
        }
        if (!await roleManager.RoleExistsAsync("Manager"))
        {
            await roleManager.CreateAsync(new ApplicationRole("Manager"));
        }
        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new ApplicationRole("User"));
        }
    }

    private static async Task SeedAdminUser(UserManager<ApplicationUser> userManager)
    {
        if (await userManager.FindByEmailAsync("admin@besmoke.com") == null)
        {
            var adminUser = new ApplicationUser
            {
                UserName = "admin@besmoke.com",
                Email = "admin@besmoke.com",
                FirstName = "Admin",
                LastName = "User",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(adminUser, "Admin@123");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }

    private static async Task SeedProducts(BesmokeDbContext context)
    {
        if (!await context.Products.AnyAsync())
        {
            var products = new List<Product>
            {
                new Product
                {
                    Name = "Standard Erlenmeyer",
                    Type = ProductType.ErlenmeyerFlask,
                    Size = "250 mL",
                    Material = Material.Glass,
                    CreatedBy = "System"
                },
                new Product
                {
                    Name = "Plastic Beaker",
                    Type = ProductType.Beaker,
                    Size = "500 mL",
                    Material = Material.Plastic,
                    CreatedBy = "System"
                }
            };

            await context.Products.AddRangeAsync(products);
            await context.SaveChangesAsync();
        }
    }
}