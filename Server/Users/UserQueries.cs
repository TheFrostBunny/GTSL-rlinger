using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Users;

[ExtendObjectType(GraphQLObjectType.Query)]
public class UserQueries
{
    public async Task<User?> GetUserAsync(
        [ID(nameof(User))] int userId,
        ApplicationDbContext context,
        CancellationToken cancellationToken) =>
        await context.Users
            .FirstOrDefaultAsync(user => user.Id == userId, cancellationToken);
}