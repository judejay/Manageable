using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Collections.Generic;

namespace Manageable.Server.Model
{
    public class Person

    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string FirstName { get; set; }
        public required string Surname { get; set; }
        public required string Sex { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public int Age { get; set; }

    }
}
