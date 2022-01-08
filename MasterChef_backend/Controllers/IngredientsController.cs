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
    [Route("api/ingredientsController")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public IngredientsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

       
        [HttpPost]
        public Recipe[] SearchRecipeByIngredients(List<string> inputIngredients)
        {
            List<Recipe> results = new List<Recipe>();
            string query = @"select * from [MasterChef].[dbo].[Recipe]";
            string query2 = @"select [MasterChef].[dbo].[Ingredient].Name, [MasterChef].[dbo].[Ingredient].IngredientId, [MasterChef].[dbo].[Recipe_ingredient].Amount from [MasterChef].[dbo].[Ingredient] JOIN [MasterChef].[dbo].[Recipe_ingredient] 
                ON [MasterChef].[dbo].[Ingredient].IngredientId = [MasterChef].[dbo].[Recipe_ingredient].IngredientId
                WHERE [MasterChef].[dbo].[Recipe_ingredient].RecipeId =@recipeId";
            string sqlDataSource = _configuration.GetConnectionString("MasterchefAppCon");
            SqlDataReader reader, reader2;
            using (SqlConnection connection = new SqlConnection(sqlDataSource))
            {
                connection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, connection))
                {
                    reader = myCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        Recipe result = new Recipe();
                        result.RecipeId = (int)reader["RecipeId"];
                        result.Name = (string)reader["Name"];
                        result.Description = (string)reader["Description"];
                        result.CaloriesNo = (int)reader["CaloriesNo"];
                        result.Image = (string)reader["Image"];
                        result.PreparingTime = (int)reader["PreparingTime"];
                        result.Servings = (int)reader["Servings"];
                        using (SqlConnection connection2 = new SqlConnection(sqlDataSource))
                        {
                            connection2.Open();
                            List<Ingredient> ingredientList = new List<Ingredient>();
                            using (SqlCommand myCommand2 = new SqlCommand(query2, connection2))
                            {
                                myCommand2.Parameters.AddWithValue("@RecipeId", result.RecipeId);
                                reader2 = myCommand2.ExecuteReader();
                                while (reader2.Read())
                                {
                                    Ingredient ingredient = new Ingredient();
                                    ingredient.IngredientName = (string)reader2["Name"];
                                    ingredient.IngredientId = (int)reader2["IngredientId"];
                                    ingredient.Amount = (int)reader2["Amount"];
                                    ingredientList.Add(ingredient);
                                }
                            }
                            reader2.Close();
                            connection2.Close();
                            result.ListOfIngredients = ingredientList;
                            bool ok = true;
                            foreach(var ingredient in ingredientList)
                            {
                                if(!inputIngredients.Contains(ingredient.IngredientName))
                                {
                                    ok = false;
                                    break;
                                }
                            }
                            if (ok)
                            {
                            results.Add(result);
                            }
                        }
                    }
                    }
                    reader.Close();
                    connection.Close();
                }

            return results.ToArray();
        }
    }
}
