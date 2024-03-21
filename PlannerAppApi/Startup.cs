using PlannerAppApi.Data;
using Microsoft.EntityFrameworkCore; // Add this line
using Microsoft.Extensions.Configuration; // Add this line

namespace PlannerAppApi
{
    public class Startup
    {
        private readonly IConfiguration Configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
        }
    }
}
