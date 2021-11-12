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

namespace MasterChef_backend.Controllers
{
    [Microsoft.AspNetCore.Components.Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RegisterController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            string query = @"select * from dbo.User";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(User newUser)
        {
            DataTable table = new DataTable();
            string query = @"insert into dbo.User (FirstName, LastName, Username, Password, Height, Weight, Age, Email) 
                             values (@FirstName, @LastName, @Username, @Password, @Height, @Weight, @Age, @Email)";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    myCommand.Parameters.AddWithValue("@FirstName", newUser.FirstName);
                    myCommand.Parameters.AddWithValue("@LastName", newUser.LastName);
                    myCommand.Parameters.AddWithValue("@Username", newUser.Username);
                    myCommand.Parameters.AddWithValue("@Password", newUser.Password);
                    myCommand.Parameters.AddWithValue("@Height", newUser.Height);
                    myCommand.Parameters.AddWithValue("@Weight", newUser.Weight);
                    myCommand.Parameters.AddWithValue("@Age", newUser.Age);
                    myCommand.Parameters.AddWithValue("@Email", newUser.Email);
                    reader = myCommand.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
            }

            return new JsonResult(table);

        }
    }
}
