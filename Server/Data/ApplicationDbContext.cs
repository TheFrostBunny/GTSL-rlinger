using GreenTechSee.Users;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; } = default!;
}