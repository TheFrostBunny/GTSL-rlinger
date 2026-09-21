using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{

}