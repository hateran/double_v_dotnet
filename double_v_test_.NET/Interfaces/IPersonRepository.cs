using double_v_test_.NET.Models;

namespace double_v_test_.NET.Interfaces
{
    public interface IPersonRepository
    {
        ICollection<Person> GetPeople();
        Person GetPerson(int id);
        bool PersonExists(int id);
        bool CreatePerson(Person person);
        bool UpdatePerson(Person person);
        bool Save();
    }
}
