import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '50%'
    }
  },
  textField: {
    margin: theme.spacing(3),
    width: '80%'
  },
  buttonContainer: {
    display: 'block',
    margin: 'auto'
  }
}));

const RecipeForm = ({
  handleSubmit,
  handleChange,
  handleCancel,
  recipe: { title, instructions, ingredients }
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Recipe title"
          className={classes.textField}
          fullWidth
          value={title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="ingredients"
          name="ingredients"
          label="Ingredients"
          className={classes.textField}
          fullWidth
          multiline
          value={ingredients}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="instructions"
          name="instructions"
          label="Instructions"
          className={classes.textField}
          fullWidth
          multiline
          value={instructions}
          onChange={handleChange}
        />
        <div className={classes.buttonContainer}>
          <Button color="primary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={title.length < 1 || ingredients.length < 1}
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

RecipeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  instructions: PropTypes.string,
  ingredients: PropTypes.string
};

export default RecipeForm;
