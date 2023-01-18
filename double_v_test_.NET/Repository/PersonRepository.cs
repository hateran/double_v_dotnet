using double_v_test_.NET.Data;
using double_v_test_.NET.Interfaces;
using double_v_test_.NET.Models;
using Microsoft.EntityFrameworkCore;

namespace double_v_test_.NET.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly DataContext context;

        public PersonRepository(DataContext context)
        {
            this.context = context;
        }

        public bool CreatePerson(Person person)
        {
            context.Add(person);
            return Save();
        }

        public ICollection<Person> GetPeople()
        {
            return context.Persons.OrderBy(x => x.Id).ToList();
        }

        public Person GetPerson(int id)
        {
            return context.Persons.Where(x => x.Id == id).FirstOrDefault();
        }

        public bool PersonExists(int id)
        {
            return context.Persons.Any(x => x.Id == id);
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdatePerson(Person person)
        {
            context.Update(person);
            return Save();
        }
    }
}
