using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;
using PlannerAppApi.Data; // Make sure this is using the correct namespace for your ApplicationDbContext

namespace PlannerAppApi
{
public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        // Build configuration
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()) // Make sure this directory is correct for your appsettings.json file
            .AddJsonFile("appsettings.json")
            .Build();

        // Create options builder
        var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
        var connectionString = configuration.GetConnectionString("DefaultConnection"); // Make sure this matches your connection string name in appsettings.json

        builder.UseSqlServer(connectionString);

        return new ApplicationDbContext(builder.Options);
    }
}
}
