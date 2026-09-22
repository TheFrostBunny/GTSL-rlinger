using HotChocolate.Execution;

namespace GreenTechSee.Students;

public class StudentCredentials
{
    public int StudentId { get; set; }
    public Student? Student { get; set; }
    public string PasswordHash { get; set; } = default!;
}
