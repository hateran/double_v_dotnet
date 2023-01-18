using AutoMapper;
using double_v_test_.NET.Dto;
using double_v_test_.NET.Interfaces;
using double_v_test_.NET.Models;
using double_v_test_.NET.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace double_v_test_.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : Controller
    {
        private readonly IPersonRepository personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            this.personRepository = personRepository;
        }

        // GET: api/<PersonController>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Person>))]
        public IActionResult Get()
        {
            var people = personRepository.GetPeople();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(people);
        }

        // GET api/<PersonController>/5
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Person))]
        [ProducesResponseType(400)]
        public IActionResult Get(int id)
        {
            if (!personRepository.PersonExists(id))
            {
                return NotFound();
            }

            var person = personRepository.GetPerson(id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(person);
        }

        // POST api/<PersonController>
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Post([FromBody] Person person)
        {
            if (person == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var personMapped = person;

            if (!personRepository.CreatePerson(personMapped))
            {
                ModelState.AddModelError("", "Person Could Not Be Created");
                return StatusCode(500, ModelState);
            }

            return Ok("Person Created");
        }

        // PUT api/<PersonController>/5
        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult Put(int id, [FromBody] PersonDto person)
        {
            if (person == null)
            {
                return BadRequest();
            }

            if (id != person.Id)
            {
                return BadRequest(ModelState);
            }

            if (!personRepository.PersonExists(id))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var savedPerson = personRepository.GetPerson(id);

            savedPerson.Names = person.Names;
            savedPerson.LastName = person.LastName;
            savedPerson.Identification= person.Identification;
            savedPerson.Email = person.Email;
            savedPerson.TypeIdentification= person.TypeIdentification;

            if (!personRepository.UpdatePerson(savedPerson))
            {
                ModelState.AddModelError("", "User Could Not Be Updated");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
