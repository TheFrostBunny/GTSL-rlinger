using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using GreenTechSee.Users;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Students;

[Node]
public class Student
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public Trades? WantedTrade { get; set; }
    public string? Line { get; set; }
    public string? ProfileImage { get; set; }
    public List<StudentSocialMedia>? MediaLinks { get; set; }
    public string? Description { get; set; }
    public string? AfterApprenticeShip { get; set; }
    public List<StudentCertificates>? Certificates { get; set; }
    [NodeResolver]
    public static async Task<Student?> GetStudentByIdAsync(
        int id,
        ApplicationDbContext context,
        CancellationToken cancellationToken) =>
        await context.Students.FirstOrDefaultAsync(student => student.Id == id, cancellationToken);
}