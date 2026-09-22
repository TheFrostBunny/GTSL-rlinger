namespace GreenTechSee.Students;

public class StudentCredential
{
    public int StudentId { get; set; }
    public Student Student { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
}