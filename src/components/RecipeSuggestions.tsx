import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { usePantryItems } from '../hooks/usePantryItems';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%', // 16:9
});

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const AnimatedCard = motion(StyledCard);

interface Recipe {
  id: number;
  title: string;
  image: string;
  missedIngredientCount: number;
}

const RecipeSuggestions: React.FC = () => {
  const { items } = usePantryItems();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const ingredients = items.map(item => item.name).join(',');
      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=4&apiKey=${d6788cc451554089940d63de6b3069af}`
      );
      const data = await response.json();
      setRecipes(data);
    };

    if (items.length > 0) {
      fetchRecipes();
    }
  }, [items]);

  const handleViewRecipe = (recipeTitle: string) => {
    const searchQuery = encodeURIComponent(`${recipeTitle} recipe`);
    const url = `https://www.google.com/search?q=${searchQuery}`;
    window.open(url, '_blank');
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Recipe Suggestions
      </Typography>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={3}>
            <AnimatedCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <StyledCardMedia
                image={recipe.image}
                title={recipe.title}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  {recipe.title}
                </Typography>
                <Typography>
                  Missing ingredients: {recipe.missedIngredientCount}
                </Typography>
              </StyledCardContent>
              <Button
                size="small"
                color="primary"
                onClick={() => handleViewRecipe(recipe.title)}
              >
                View Recipe
              </Button>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeSuggestions;

