import React, { Component } from "react";
import "./App.css";
import { recipes } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

class App extends Component {
  //State
  state = {
    recipes: recipes,
    url: `https://www.food2fork.com/api/search?key=76db1c3e79afea5aa0a4aa3bc54c33e3`,
    base_url: `https://www.food2fork.com/api/search?key=76db1c3e79afea5aa0a4aa3bc54c33e3`,
    details_id: 35375,
    pageIndex: 1,
    search: "",
    query: "&q=",
    error: ""
  };

  //AJAX - Fetch using async await (write code as if
  //performing actions synchronously)
  async getRecipes() {
    try {
      //Get API url from state (retrieves our list of recipes)
      const data = await fetch(this.state.url);
      //Get JSON info from data const
      const jsonData = await data.json();
      console.log(jsonData);
      //Conditional logic for if 0 search results
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return { error: `Sorry but your search did not return any results.` };
        });
      } else {
        this.setState(() => {
          //Change the recipes array in state to the recipes JSON
          //we are fetching
          return { recipes: jsonData.recipes };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //React lifecycle method - invoked immediately after a
  //component is mounted (calling getRecipes when App is mounted)
  componentDidMount() {
    this.getRecipes();
  }

  //If the pageIndex is something render the recipelist
  displayPage = index => {
    switch (index) {
      default:
      case 1:
        /* Get the recipe list from state and parse it to RecipeList */
        /*Get the index from handleDetails method */
        return (
          <RecipeList
            // pass down all these values to RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            error={this.state.error}
          />
        );
      case 0:
        /* Get the id of the cooking recipe details and parse to RecipeDetails */
        /*Get the index from handleIndex method */
        return (
          <RecipeDetails
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  //changes the page to the homepage
  handleIndex = index => {
    this.setState({
      //make pageIndex in state = to the index here
      pageIndex: index
    });
  };
  //changes the page to the details
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    });
  };

  //for search text input
  handleChange = e => {
    this.setState(
      {
        //Set the search value in state to value, parse as e
        search: e.target.value
      },
      () => {
        console.log(this.state.search);
      }
    );
  };

  //button for submitting the search form
  handleSubmit = e => {
    e.preventDefault();
    //Deconstruct values from the state
    const { base_url, query, search } = this.state;
    //passing a function to join values in the state object
    //and changing the value for url
    this.setState(
      () => {
        //Join the base-url+&q=+searchterm, then clear search
        return { url: `${base_url}${query}${search}`, search: "" };
        //Then call the ajax method to get the url that renders results
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    //console.log(this.state.recipes);

    return (
      // Calls the switch function for page management
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
