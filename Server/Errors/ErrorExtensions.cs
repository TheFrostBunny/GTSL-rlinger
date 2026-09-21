namespace GreenTechSee.Errors;

public static class ErrorExtensions
{
    public static string ToGraphQLTypename(this ICommonError exception)
    {
        return exception.GetType().Name.Replace("Exception", "Error");
    }
}
