import React, { Component } from "react";
import { recipe } from "../tempDetails";

export default class RecipeDetails extends Component {
  // constructor(props) {
  //   //Get the props from the App Component we are extending from
  //   super(props);

  //   this.state = {
  //     recipe: recipe,
  //     url: `https://www.food2fork.com/api/get?key=76db1c3e79afea5aa0a4aa3bc54c33e3&rId=${
  //       this.props.id
  //     }`
  //   };
  // }

  // //React lifecycle method - invoked immediately after a
  // //component is mounted
  // async componentDidMount() {
  //   try {
  //     //Get API url from state
  //     const data = await fetch(this.state.url);
  //     //Get JSON info from data const
  //     const jsonData = await data.json();
  //     //Change the recipe array in state to the recipe JSON
  //     //we are fetching
  //     this.setState({
  //       recipe: jsonData.recipe
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  state = { recipe: recipe };

  //React lifecycle method - invoked immediately after a
  //component is mounted
  async componentDidMount() {
    //Get the details_id from Apps.js which was passed at render()
    const id = this.props.id;
    //Get API url
    const url = `https://www.food2fork.com/api/get?key=76db1c3e79afea5aa0a4aa3bc54c33e3&rId=${id}`;

    try {
      //Get API url from above
      const data = await fetch(url);
      //Get JSON info from data const
      const jsonData = await data.json();
      //
      this.setState(
        (state, props) => {
          return { recipe: jsonData.recipe };
          //pass callback function after object with ,
        },
        () => {}
      );
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //console.log(this.state.recipe);
    //Destructure the recipe variable we are parsing into the state
    //from tempDetails
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    //Destructure handleIndex method from prop parsed when this comp called
    const { handleIndex } = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-6 my-3">
              {/* Button will call the handleIndex method in App */}
              <button
                type="button"
                className="btn btn-warning mb-5 text-capitalize"
                onClick={() => handleIndex(1)}
              >
                back to recipe list
              </button>
              <img src={image_url} className="d-block w-100" alt="recipe" />
            </div>
            {/* Details section */}
            <div className="col-10 mx-auto col-md-6 my-3">
              <h6 className="text-uppercase">{title}</h6>
              <h6 className="text-warning text-capitalize text-slanted">
                provided by {publisher}
              </h6>
              <a
                href={publisher_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-2 text-capitalize"
              >
                publisher webpage
              </a>
              <a
                href={source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-2 mx-3 text-capitalize"
              >
                recipe url
              </a>
              <ul className="list-group mt-4">
                <h2 className="mt-3 mb-4">Ingredients</h2>
                {/* Index is the position in the array */}
                {ingredients.map((item, index) => {
                  return (
                    <li key={index} className="list-group-item text-slanted">
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
