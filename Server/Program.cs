using GreenTechSee.Data;
using GreenTechSee.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace GreenTechSee;

public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args)
            .Build()
            .MigrateDatabase<ApplicationDbContext>()
            .Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args)
    {
        var loggerFactory = LoggerFactory.Create(builder =>
        {
            builder
                .ClearProviders()
                .AddConsole();
        });
        var logger = loggerFactory.CreateLogger<Startup>();

        return Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup(context => new Startup(context.Configuration, logger, context.HostingEnvironment));
            });
    }
}
