using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterChef_backend.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public float Height { get; set; }
        public float Weight { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
    }
}
