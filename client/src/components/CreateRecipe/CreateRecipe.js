import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createRecipe } from '../../store/actions/recipes';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import RecipeForm from '../RecipeForm/RecipeForm';
import Spinner from '../ui/Spinner';

export const CreateRecipe = ({ error, loading, createRecipe }) => {
  const [redirectPage, setRedirectPage] = useState(false);

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instruction: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[name] = value;
    setRecipe(updatedRecipe);
  };

  const handleSaveRecipe = event => {
    event.preventDefault();
    createRecipe(recipe);
    setRedirectPage(true);
  };

  const handleCancel = () => {
    setRedirectPage(true);
  };

  if (redirectPage && !loading) {
    return <Redirect to="/myrecipes" />;
  }

  let pageContent = null;

  if (loading) {
    pageContent = <Spinner />;
  } else {
    pageContent = (
      <RecipeForm
        recipe={recipe}
        handleSubmit={handleSaveRecipe}
        handleCancel={handleCancel}
        handleChange={handleChange}
      />
    );
  }

  return (
    <Fragment>
      <TopNavBar />
      {pageContent}
      <div>{error}</div>
    </Fragment>
  );
};

CreateRecipe.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  createRecipe: PropTypes.func.isRequired
};

const mapStateToProps = ({ recipes: { error, loading } }) => {
  return {
    error,
    loading
  };
};

export default connect(
  mapStateToProps,
  { createRecipe }
)(CreateRecipe);
