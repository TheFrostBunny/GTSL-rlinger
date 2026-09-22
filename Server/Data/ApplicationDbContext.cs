using System.Linq;
using GreenTechSee.Students;
using GreenTechSee.Companies;
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
        modelBuilder.Entity<StudentCredential>().HasKey(c => c.StudentId);

        modelBuilder.Entity<Student>()
            .HasOne(s => s.Credential)
            .WithOne(c => c.Student)
            .HasForeignKey<StudentCredential>(c => c.StudentId)
            .OnDelete(DeleteBehavior.Cascade);


        modelBuilder.Entity<CompanySocialMedia>().HasKey(t => new { t.CompanyId, t.Id });
        modelBuilder.Entity<CompanyCredential>().HasKey(c => c.CompanyId);

        modelBuilder.Entity<Company>()
            .HasOne(s => s.CompanyCredential)
            .WithOne(c => c.Company)
            .HasForeignKey<CompanyCredential>(c => c.CompanyId)
            .OnDelete(DeleteBehavior.Cascade);

    }
    public DbSet<Student> Students { get; set; } = default!;
    public DbSet<StudentSocialMedia> StudentSocialMedias { get; set; } = default!;
    public DbSet<StudentCertificates> StudentCertificates { get; set; } = default!;
    public DbSet<StudentCredential> StudentCredentials { get; set; } = default!;

    public DbSet<Company> Companys { get; set; } = default!;
    public DbSet<CompanySocialMedia> CompanySocialMedias { get; set; } = default!;
    public DbSet<CompanyCredential> CompanyCredentials { get; set; } = default!;
}