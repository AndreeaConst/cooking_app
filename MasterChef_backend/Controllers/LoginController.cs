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
    [Route("api/loginController")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            string query = @"select * from [MasterChef].[dbo].[User]";
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
        public User GetUserByEmailAndPassword(User user)
        {
            User result=new Models.User();
            string query = @"select * from [MasterChef].[dbo].[User] 
                             where [MasterChef].[dbo].[User].Email=@Email and [MasterChef].[dbo].[User].Password=@Password";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    myCommand.Parameters.AddWithValue("@Email", user.Email);
                    myCommand.Parameters.AddWithValue("@Password", user.Password);
                    reader = myCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        result.FirstName = (string)reader["FirstName"];
                        result.LastName = (string)reader["LastName"];
                        result.Username = (string)reader["Username"];
                        result.Password = (string)reader["Password"];
                        result.Height = (float)reader["Height"];
                        result.Weight = (float)reader["Weight"];
                        result.Age = (int)reader["Age"];
                        result.Email = (string)reader["Email"];

    }
                    reader.Close();
                    connection.Close();
                }
            }

            return result;

        }
    }
}

