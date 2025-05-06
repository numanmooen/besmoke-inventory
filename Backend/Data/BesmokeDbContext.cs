using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class BesmokeDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    public BesmokeDbContext(DbContextOptions<BesmokeDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }
    public DbSet<InventoryOperation> InventoryOperations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Product>()
            .HasIndex(p => new { p.Name, p.Type, p.Size, p.Material })
            .IsUnique();
         
    }

}