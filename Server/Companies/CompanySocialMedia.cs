namespace GreenTechSee.Companies;

public class CompanySocialMedia
{
    public int Id { get; set; }
    public int CompanyId { get; set; }
    public Company? Company { get; set; }
    public string? MediaUrl { get; set; }
}