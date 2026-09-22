using System;
using GreenTechSee.Errors;

namespace GreenTechSee.Users.Exceptions;

public class UserNotFoundException()
    : Exception("User not found"),
    ICommonError
{
}
