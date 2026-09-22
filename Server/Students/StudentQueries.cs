using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Students;

[ExtendObjectType(GraphQLObjectType.Query)]
public class StudentQueries
{
    public async Task<Student?> GetStudentAsync(
        [ID(nameof(Student))] int studentId,
        ApplicationDbContext context,
        CancellationToken cancellationToken) =>
        await context.Students
            .FirstOrDefaultAsync(student => student.Id == studentId, cancellationToken);
}