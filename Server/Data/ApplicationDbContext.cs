using System.Linq;
using GreenTechSee.Students;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.PropertyInfo?
                    .GetCustomAttributes(typeof(ComputedAttribute), false)
                    .FirstOrDefault(a => a is ComputedAttribute) is ComputedAttribute computedAttribute)
                {
                    property.SetComputedColumnSql(computedAttribute.Sql);
                    property.SetIsStored(true);
                }
            }
        }

        modelBuilder.Entity<StudentSocialMedia>().HasKey(t => new { t.StudentId, t.Id });
        modelBuilder.Entity<StudentCertificates>().HasKey(t => new { t.StudentId, t.Id });

    }
    public DbSet<Student> Students { get; set; } = default!;
    public DbSet<StudentSocialMedia> StudentSocialMedias { get; set; } = default!;
    public DbSet<StudentCertificates> StudentCertificates { get; set; } = default!;
}