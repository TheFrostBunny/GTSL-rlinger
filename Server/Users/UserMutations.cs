using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types;
using HotChocolate.Subscriptions;
using HotChocolate.Types.Relay;

namespace GreenTechSee.Users;

[ExtendObjectType(GraphQLObjectType.Mutation)]
public class UserMutations
{
    public async Task<User> CreateUserAsync(
        string name,
        ApplicationDbContext context,
        ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var user = new User
        {
            Name = name,
        };

        context.Users.Add(user);
        await context.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(nameof(UserSubscriptions.OnUserCreated), user, cancellationToken);

        return user;
    }
}