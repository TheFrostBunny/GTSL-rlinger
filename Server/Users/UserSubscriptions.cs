using HotChocolate;
using HotChocolate.Types;

namespace GreenTechSee.Users;

[ExtendObjectType(GraphQLObjectType.Subscription)]
public class UserSubscriptions
{
    [Subscribe]
    [Topic]
    public User OnUserCreated([EventMessage] User user) => user;
}
