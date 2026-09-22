namespace GreenTechSee.Students;

public class StudentCertificates
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public Student? Student { get; set; }
    public string? Description { get; set; }
}