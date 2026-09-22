using HotChocolate;
using HotChocolate.Types;

namespace GreenTechSee.Students;

[ExtendObjectType(GraphQLObjectType.Subscription)]
public class StudentSubscriptions
{
    [Subscribe]
    [Topic]
    public Student OnStudentCreated([EventMessage] Student student) => student;
}
