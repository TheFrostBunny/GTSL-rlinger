using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Companies;

[Node]
public class Company
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? ProfileImage { get; set; }
    public List<CompanySocialMedia>? mediaLinks { get; set; }
    public string? Description { get; set; }
    public CompanyCredential? CompanyCredential { get; set; }
    public string? Location { get; set; }

    [NodeResolver]
    public static async Task<Company?> GetCompanyByIdAsync(
        int id,
        ApplicationDbContext context,
        CancellationToken cancellationToken) =>
        await context.Companys.FirstOrDefaultAsync(company => company.Id == id, cancellationToken);

}