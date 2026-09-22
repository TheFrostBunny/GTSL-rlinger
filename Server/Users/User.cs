using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Users;

[Node]
public class User
{
    public int Id { get; set; }
    public string? Name { get; set; }

    [NodeResolver]
    public static async Task<User?> GetUserByIdAsync(
        int id,
        ApplicationDbContext context,
        CancellationToken cancellationToken) =>
        await context.Users.FirstOrDefaultAsync(user => user.Id == id, cancellationToken);
}