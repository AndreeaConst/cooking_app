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
        public List<Ingredient> ListOfIngredients { get; set; }

        private int recipeId;
        public int getId()
        {
            return recipeId;
        }

        private string name;
        public string getName()
        {
            return name;
        }

        public void setName(string value)
        {
            name = value;
        }

        private int caloriesNo;
        public int getCaloriesNo()
        {
            return caloriesNo;
        }

        public void setCaloriesNo(int value)
        {
            caloriesNo = value;
        }

        private string description;
        public string getDescription()
        {
            return description;
        }
        public void setDescription(string value)
        {
            description = value;
        }

        private string image;
        public string getImage()
        {
            return image;
        }

        public void setImage(string value)
        {
            image = value;
        }

        private int preparingTime;
        public int getPreparingTime()
        {
            return preparingTime;
        }

        public void setPreparingTime(int value)
        {
            preparingTime = value;
        }

        private int servings;
        public int getServings()
        {
            return servings;
        }

        public void setServing(int value)
        {
            servings = value;
        }
    }
}
