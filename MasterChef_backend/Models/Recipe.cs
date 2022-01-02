using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MasterChef_backend.Models
{
    public class Recipe
    {
        public int RecipeId { get; set; }
        public string Name { get; set; }
        public int CaloriesNo { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int PreparingTime { get; set; }
        public int Servings { get; set; }
        public string ListOfIngredients { get; set; }

       
    }
}
