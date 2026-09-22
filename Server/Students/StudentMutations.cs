using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types;
using HotChocolate.Subscriptions;
using HotChocolate.Types.Relay;
using GreenTechSee.Students;

namespace GreenTechSee.Students;

[ExtendObjectType(GraphQLObjectType.Mutation)]
public class StudentMutations
{
    public async Task<Student> CreateStudentAsync(
        string name,
        ApplicationDbContext context,
        ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var student = new Student
        {
            Name = name,
        };

        context.Students.Add(student);
        await context.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(nameof(StudentSubscriptions.OnStudentCreated), student, cancellationToken);

        return student;
    }
}