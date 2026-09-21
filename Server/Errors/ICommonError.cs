using System.Collections.Generic;
using HotChocolate;

namespace GreenTechSee.Errors;

public interface ICommonError
{
    string Message { get; }

    [GraphQLIgnore]
    public IReadOnlyDictionary<string, object?> GetExtensions() => new Dictionary<string, object?>();
}
