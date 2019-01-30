import React, { Component } from "react";
import Recipe from "./Recipe";
import RecipeSearch from "./RecipeSearch";

export default class RecipeList extends Component {
  render() {
    //We parsed the list of recipes and handleDetails from App.js as a prop
    const {
      recipes,
      handleDetails,
      value,
      handleChange,
      handleSubmit,
      error
    } = this.props;
    return (
      <React.Fragment>
        {/* Pass down values to RecipeSearch */}
        <RecipeSearch
          value={value}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <div className="container my-5">
          {/* title */}
          <div className="row">
            <div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
              <h1 className="text-slanted">recipe list</h1>
            </div>
          </div>
          <div className="row">
            {/* end of title */}
            {/* Ternary operator to check if error is thrown */}
            {error ? (
              <h1 className="text-danger text-center">{error}</h1>
            ) : (
              // Loop through the recipes array using a map, assign
              //each iteration to recipe var, arrow callback func
              //returns Recipe component. Parse recipe id,recipe,handleDetails
              recipes.map(recipe => {
                return (
                  <Recipe
                    key={recipe.recipe_id}
                    recipe={recipe}
                    handleDetails={handleDetails}
                  />
                );
              })
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
