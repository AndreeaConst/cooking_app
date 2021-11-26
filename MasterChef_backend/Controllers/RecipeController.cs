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
    [Route("api/recipeController")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RecipeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            string query = @"select * from [MasterChef].[dbo].[Recipe]";
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
        public JsonResult Post(Recipe newRecipe)
        {
            DataTable table = new DataTable();
            string query = @"insert into [MasterChef].[dbo].[Recipe] (Name, CaloriesNo, Description, Image, PreparingTime, Servings) 
                             values (@Name, @CaloriesNo, @Description, @Image, @PreparingTime, @Servings)";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    myCommand.Parameters.AddWithValue("@Name", newRecipe.Name);
                    myCommand.Parameters.AddWithValue("@CaloriesNo", newRecipe.CaloriesNo);
                    myCommand.Parameters.AddWithValue("@Description", newRecipe.Description);
                    myCommand.Parameters.AddWithValue("@Image", newRecipe.Image);
                    myCommand.Parameters.AddWithValue("@PreparingTime", newRecipe.PreparingTime);
                    myCommand.Parameters.AddWithValue("@Servings", newRecipe.Servings);
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
