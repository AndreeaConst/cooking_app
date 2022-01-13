using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using MasterChef_backend.Models;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MasterChef_backend.Controllers
{
    [Route("api/registerController")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public User AddUser(User newUser)
        {
            DataTable table = new DataTable();
            string query = @"insert into [MasterChef].[dbo].[User] (FirstName, LastName, Password, Height, Weight, Age, Email) 
                             values (@FirstName, @LastName, @Password, @Height, @Weight, @Age, @Email)";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", newUser.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", newUser.LastName);
                    myCommand.Parameters.AddWithValue("@Password", newUser.Password);
                    myCommand.Parameters.AddWithValue("@Height", newUser.Height);
                    myCommand.Parameters.AddWithValue("@Weight", newUser.Weight);
                    myCommand.Parameters.AddWithValue("@Age", newUser.Age);
                    myCommand.Parameters.AddWithValue("@Email", newUser.Email);
                    reader = myCommand.ExecuteReader();
                    reader.Close();
                    connection.Close();
                }


                return newUser;

            }
        }
    }
}
