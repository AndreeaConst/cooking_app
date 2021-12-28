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
        public Recipe[] SearchRecipeByName(Recipe inputRecipe)
        {
            List<Recipe> results = new List<Recipe>();
            string query = @"select * from [MasterChef].[dbo].[Recipe] 
                             where [MasterChef].[dbo].[Recipe].Name=@Name";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    myCommand.Parameters.AddWithValue("@Name", inputRecipe.Name);
                    reader = myCommand.ExecuteReader();
                    if(reader.HasRows)
                    {
                        do
                        {
                            while (reader.Read())
                            {
                                Recipe result = new Recipe();
                                result.Name = (string)reader["Name"];
                                result.Description = (string)reader["Description"];
                                result.CaloriesNo = (int)reader["CaloriesNo"];
                                result.Image = (string)reader["Image"];
                                result.PreparingTime = (int)reader["PreparingTime"];
                                result.Servings = (int)reader["Servings"];
                                results.Add(result);
                            }
                        } while (reader.NextResult());
                        reader.Close();
                        connection.Close();
                    }
                    
                }
            }

            return results.ToArray();

        }

        //[HttpPost]
        //public Recipe SearchByPreparingTime(int preparingTime)
        //{
        //    Recipe result = new Recipe();
        //    DataTable table = new DataTable();
        //    string query = @"select * from [MasterChef].[dbo].[Recipe] 
        //                     where [MasterChef].[dbo].[Recipe].PreparingTime=@PreparingTime";
        //    string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
        //    SqlDataReader reader;
        //    using (SqlConnection connection = new SqlConnection(sqlDataSource))
        //    {
        //        connection.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, connection))
        //        {
        //            myCommand.Parameters.AddWithValue("@PreparingTime", preparingTime);
        //            reader = myCommand.ExecuteReader();
        //            while (reader.Read())
        //            {
        //                result.Name = (string)reader["Name"];
        //                result.CaloriesNo = (int)reader["CaloriesNo"];
        //                result.Description = (string)reader["Description"];
        //                result.Image = (string)reader["Image"];
        //                result.PreparingTime = (int)reader["PreparingTime"];
        //                result.Servings = (int)reader["Servings"];

        //            }
        //            reader.Close();
        //            connection.Close();
        //            table.Load(reader);
        //            reader.Close();
        //            connection.Close();
        //        }
        //    }

        //    return result;

        //}
    }
}
