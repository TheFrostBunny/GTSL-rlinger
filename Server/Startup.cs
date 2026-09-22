

using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using GreenTechSee.Data;
using GreenTechSee.Errors;
using GreenTechSee.Options;
using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GreenTechSee;

public class Startup(IConfiguration configuration, ILogger<Startup> logger, IWebHostEnvironment env)
{
    public IConfiguration Configuration { get; } = configuration;
    public ILogger<Startup> Logger { get; } = logger;
    private readonly IWebHostEnvironment _env = env;
    private readonly string AllowedOrigin = "_allowedOrigin";

    private bool ShouldDisableIntrospection()
    {
        var allowIntrospection = Configuration.GetValue<bool?>("GraphQL:AllowIntrospection");
        if (allowIntrospection.HasValue)
        {
            return !allowIntrospection.Value;
        }

        return !_env.IsDevelopment();
    }

    public void ConfigureServices(IServiceCollection services)
    {
        // Database
        services.AddPooledDbContextFactory<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(Configuration.GetConnectionString("Postgres"));
            if (_env.IsDevelopment())
            {
                options.EnableSensitiveDataLogging();
                options.EnableDetailedErrors();
            }
        });

        services.AddCors(option =>
        {
            option.AddPolicy(name: AllowedOrigin,
            builder =>
            {
                var corsOptions = Configuration.GetSection(CorsOptions.Cors).Get<CorsOptions>();
                var origins = corsOptions?.Origins ?? ["*"];

                if (corsOptions == null)
                {
                    Logger.LogWarning($"{CorsOptions.Cors}:{nameof(CorsOptions.Origins)} is missing in configuration, allowing all origins.");
                }
                else if (origins.Length == 1 && origins[0] == "*")
                {
                    Logger.LogWarning($"{CorsOptions.Cors}:{nameof(CorsOptions.Origins)} is set to '*', allowing all origins.");
                }

                builder.WithOrigins(origins)
            .AllowAnyHeader()
            .AllowAnyMethod();
            });
        });

        var graphQLServer = services
           .AddGraphQLServer()
           .AddMutationConventions()
           .AddAuthorization()
           .AddQueryType(d => d.Name(GraphQLObjectType.Query))
           .AddMutationType(d => d.Name(GraphQLObjectType.Mutation))
           .AddSubscriptionType(d => d.Name(GraphQLObjectType.Subscription))
           .AddType<UploadType>()
           .AddType(new BooleanType())
           .AddType(new BooleanType("Success", description: "A `Boolean` which indicates if the operation was successful."))
           .ModifyOptions(o =>
           {
               o.MaxAllowedNodeBatchSize = 100;
           })
           .ModifyCostOptions(o =>
           {
               o.EnforceCostLimits = false;
           })
           .AddLegacyNodeIdSerializer()
           .AddGlobalObjectIdentification()
           .AddQueryFieldToMutationPayloads()
           .AddFiltering()
           .AddSorting()
           .ModifyPagingOptions(o =>
           {
               o.DefaultPageSize = 100;
               o.MaxPageSize = 1000;
               o.IncludeTotalCount = true;
           })
           .AddInMemorySubscriptions()
           .DisableIntrospection(false)
           .RegisterDbContextFactory<ApplicationDbContext>()
           // .AddDiagnosticEventListener(sp => new ConsoleQueryLogger(sp.GetApplicationService<ILogger<ConsoleQueryLogger>>()))
           .AddErrorFilter((error) =>
           {
               Logger.LogError("Error filter received the following error: {message}", error.Message);
               if (error.Exception != null)
               {
                   Logger.LogError(error.Exception, error.Exception.Message);
               }

               if (error.Exception is ICommonError commonError)
               {
                   var extensions = new Dictionary<string, object?>
                   {
                        { "__typename", commonError.ToGraphQLTypename() },
                        { "message", commonError.Message },
                   };

                   // Add any custom extensions defined in the error
                   foreach (var entry in commonError.GetExtensions())
                   {
                       extensions[entry.Key] = entry.Value;
                   }

                   return error.WithExtensions(extensions);
               }

               return error;
           });

        // Use reflection to add all types that extend query, mutation and subscriptions
        var assembly = Assembly.GetExecutingAssembly();
        var queryTypes = assembly
            .GetTypes()
            .Where(t => t.IsClass && t.CustomAttributes
                .Any(a => a.AttributeType == typeof(ExtendObjectTypeAttribute) && a.ConstructorArguments
                    .Any(c => c.Value is string v && GraphQLObjectType.IsGraphQLType(v))));
        foreach (var type in queryTypes)
        {
            graphQLServer.AddTypeExtension(type);
        }

        // Add all union type members (these are not automatically added unless they are nodes...? So we use a custom attribute)
        var unionTypeMembers = assembly
            .GetTypes()
            .Where(t => t.IsClass && t.CustomAttributes
                .Any(a => a.AttributeType == typeof(UnionTypeMemberAttribute)));
        foreach (var type in unionTypeMembers)
        {
            graphQLServer.AddType(type);
        }
    }

    public void Configure(IApplicationBuilder app)
    {
        if (_env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();
        app.UseCors(AllowedOrigin);
        app.UseWebSockets();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGraphQL();
        });
    }
}
