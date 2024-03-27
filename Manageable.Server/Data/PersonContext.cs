using Manageable.Server.Model;
using Microsoft.EntityFrameworkCore;

namespace Manageable.Server.Data
{
    public class PersonContext: DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options) : base(options)
        {
        }
        public DbSet<Person> People { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>().HasData(
                               new Person
                               {
                                   Id = 1,
                                   Title = "Mr",
                                   FirstName = "John",
                                   Surname = "Doe",
                                   Sex = "Male",
                                   DateOfBirth = new DateOnly(1980, 1, 1),
                                   Age = 41
                               },
                               new Person
                               {
                                   Id = 2,
                                   Title = "Mrs",
                                   FirstName = "Jane",
                                   Surname = "Doe",
                                   Sex = "Female",
                                   DateOfBirth = new DateOnly(1985, 1, 1),
                                   Age = 36
                               });
        }
    }
}
