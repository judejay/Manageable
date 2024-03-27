using Microsoft.EntityFrameworkCore;

namespace Manageable.Server.Data
{
    public static class DataExtensions
    {
        public static void MigrateDatabase(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<PersonContext>();
            context.Database.Migrate();
        }
    }
}
