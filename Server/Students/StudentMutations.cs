using System.Threading;
using System.Threading.Tasks;
using GreenTechSee.Data;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Subscriptions;
using HotChocolate.Types.Relay;
using GreenTechSee.Users;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GreenTechSee.Students;

[ExtendObjectType(GraphQLObjectType.Mutation)]
public class StudentMutations
{
    public async Task<Student> CreateStudentAsync(
        string name,
        string email,
        string password,
        Trades trade,
        string? line,
        string? profileImage,
        IReadOnlyList<string>? socialMedias,
        string? description,
        string? afterApprenticeShip,
        IReadOnlyList<string>? certificates,
        ApplicationDbContext context,
        ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var passwordHasher = new PasswordHasher<Student>();
        var student = new Student
        {
            Name = name,
            Email = email,
            Line = line,
            WantedTrade = trade,
            ProfileImage = profileImage,
            Description = description,
            AfterApprenticeShip = afterApprenticeShip,
            MediaLinks = socialMedias?.Select(s => new StudentSocialMedia
            {
                MediaUrl = s,
            }).ToList(),
            Certificates = certificates?.Select(c => new StudentCertificates
            {
                Description = c
            }).ToList(),
        };
        student.Credential = new StudentCredential
        {
            PasswordHash = passwordHasher.HashPassword(student, password),
        };

        context.Students.Add(student);
        await context.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(nameof(StudentSubscriptions.OnStudentCreated), student, cancellationToken);

        return student;
    }

    public async Task<Student> UpdateStudentAsync(
        [ID(nameof(Student))] int studentId,
        string name,
        string email,
        string? newPassword,
        Trades trade,
        string? line,
        string? profileImage,
        IReadOnlyList<string>? socialMedias,
        string? description,
        string? afterApprenticeShip,
        IReadOnlyList<string>? certificates,
        ApplicationDbContext context,
        ITopicEventSender eventSender,
        CancellationToken cancellationToken)
    {
        var passwordHasher = new PasswordHasher<Student>();
        var student = await context.Students
            .Include(s => s.Certificates)
            .Include(s => s.MediaLinks)
            .Include(s => s.Credential)
            .FirstOrDefaultAsync(s => s.Id == studentId, cancellationToken);

        if (student is null)
        {
            throw new GraphQLException($"Student with id {studentId} was not found.");
        }

        student.Name = name;
        student.Email = email;
        student.Line = line;
        student.WantedTrade = trade;
        student.ProfileImage = profileImage;
        student.Description = description;
        student.AfterApprenticeShip = afterApprenticeShip;

        var mappedSocials = socialMedias?.Select(s => new StudentSocialMedia
        {
            StudentId = student.Id,
            MediaUrl = s,
        }).ToList() ?? [];

        var mappedCertificates = certificates?.Select(c => new StudentCertificates
        {
            StudentId = student.Id,
            Description = c,
        }).ToList() ?? [];

        context.StudentSocialMedias.RemoveRange(student.MediaLinks ?? []);
        context.StudentCertificates.RemoveRange(student.Certificates ?? []);

        student.MediaLinks = mappedSocials;
        student.Certificates = mappedCertificates;

        if (!string.IsNullOrWhiteSpace(newPassword))
        {
            student.Credential ??= new StudentCredential { StudentId = student.Id };
            student.Credential.PasswordHash = passwordHasher.HashPassword(student, newPassword);
        }

        await context.SaveChangesAsync(cancellationToken);
        await eventSender.SendAsync(nameof(StudentSubscriptions.OnStudentCreated), student, cancellationToken);

        return student;
    }
}