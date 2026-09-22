using HotChocolate;
using HotChocolate.Types;

namespace GreenTechSee.Students;

[ExtendObjectType(GraphQLObjectType.Query)]
public class MeQueries
{
    public Student? GetMe([GlobalState] Student? me = null) => me;
}
