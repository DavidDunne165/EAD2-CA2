using Microsoft.EntityFrameworkCore;

namespace PlannerAppApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for your entities
        public DbSet<User> User { get; set; }
        public DbSet<Event> Event { get; set; }
    }
}

