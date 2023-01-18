using double_v_test_.NET.Models;
using Microsoft.EntityFrameworkCore;

namespace double_v_test_.NET.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Person> Persons { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
