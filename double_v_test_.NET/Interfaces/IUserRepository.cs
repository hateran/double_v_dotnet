using double_v_test_.NET.Dto;
using double_v_test_.NET.Models;

namespace double_v_test_.NET.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUsers();
        User GetUser(int id);
        User GetUserByName(string name); //Username is unique
        bool UserExists(int id);
        bool UserNameExists(string name);
        bool CreateUser(User user);
        bool UpdateUser(User user);
        bool Save();
    }
}
