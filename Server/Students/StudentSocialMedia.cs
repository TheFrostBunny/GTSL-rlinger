
namespace GreenTechSee.Students;

public class StudentSocialMedia
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public Student Student { get; set; } = default!;
    public string? MediaUrl { get; set; }
}