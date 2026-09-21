namespace GreenTechSee;

public static class GraphQLObjectType
{
    public const string Query = "Query";
    public const string Mutation = "Mutation";
    public const string Subscription = "Subscription";

    public static bool IsGraphQLType(string typeName)
    {
        return typeName == Query || typeName == Mutation || typeName == Subscription;
    }
}
