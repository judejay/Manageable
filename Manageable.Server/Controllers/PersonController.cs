using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Manageable.Server.Data;
using Manageable.Server.Model;

namespace Manageable.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly PersonContext _context;

        private readonly ILogger<PersonController> _logger;
        public PersonController(PersonContext context, ILogger<PersonController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<List<Person>>> GetAllPeople()
        {
            _logger.LogInformation("Getting all people");
            var people = await _context.People.ToListAsync();
            foreach (var person in people)
            {
                //caclulate age
                person.Age = DateTime.Now.Year - person.DateOfBirth.Year;
            }
            return Ok(people);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var person = await _context.People
                .FirstOrDefaultAsync(m => m.Id == id);
            if (person == null)
            {
                _logger.LogError("Person not found");
                return NotFound();
            }

            return Ok(person);
        }

        [HttpPost]
        public async Task<ActionResult<List<Person>>> Create(Person person)
        {
            if (ModelState.IsValid)
            {
                _context.Add(person);
                await _context.SaveChangesAsync();



            }
            return Ok(await _context.People.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> Edit(Person updatedPerson)
        {


            if (ModelState.IsValid)
            {
                try
                {
                    var dbPerson = await _context.People.FindAsync(updatedPerson.Id);
                    if (dbPerson == null)
                    {
                        return NotFound();
                    }

                    dbPerson.Title = updatedPerson.Title;
                    dbPerson.FirstName = updatedPerson.FirstName;
                    dbPerson.Surname = updatedPerson.Surname;
                    dbPerson.DateOfBirth = updatedPerson.DateOfBirth;
                    ;
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PersonExists(updatedPerson.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok(updatedPerson);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Person>>> DeleteConfirmed(int id)
        {
            _logger.LogInformation("Deleting person " + id);
            var person = await _context.People.FindAsync(id);
            if (person != null)
            {
                _context.People.Remove(person);
                _logger.LogInformation("Person deleted");
            }

            await _context.SaveChangesAsync();
            return Ok(await _context.People.ToListAsync());
        }
        private bool PersonExists(int id)
        {
            return _context.People.Any(e => e.Id == id);
        }
    }
}
