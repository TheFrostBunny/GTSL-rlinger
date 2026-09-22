namespace GreenTechSee.Companies;

public class CompanyCredential
{
    public int CompanyId { get; set; }
    public Company Company { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
}
