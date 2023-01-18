using double_v_test_.NET.Data;
using double_v_test_.NET.Dto;
using double_v_test_.NET.Interfaces;
using double_v_test_.NET.Models;

namespace double_v_test_.NET.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            this._context = context;
        }

        public User GetUser(int id)
        {
            return _context.Users.Where(x => x.Id == id).FirstOrDefault();
        }

        public ICollection<User> GetUsers()
        {
            return _context.Users.OrderBy(x => x.Id).ToList();
        }

        public bool UserExists(int id)
        {
            return _context.Users.Any(x => x.Id == id);
        }

        public bool UserNameExists(string name)
        {
            return _context.Users.Any(x => x.Name == name);
        }

        public bool CreateUser(User user)
        {
            _context.Add(user);
            return Save();
        }

        public bool UpdateUser(User user)
        {
            _context.Update(user);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public User GetUserByName(string name)
        {
            return _context.Users.Where(x => x.Name == name).FirstOrDefault();
        }
    }
}
