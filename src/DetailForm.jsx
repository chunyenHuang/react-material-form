import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars

import { Form } from 'react-final-form'; // eslint-disable-line no-unused-vars
import arrayMutators from 'final-form-arrays';
import setFieldData from 'final-form-set-field-data';

import {
  Typography, // eslint-disable-line no-unused-vars
  Grid, // eslint-disable-line no-unused-vars
  Button, // eslint-disable-line no-unused-vars
  CircularProgress, // eslint-disable-line no-unused-vars
} from '@material-ui/core';

import {
  renderFormField,
} from './FormFields';

import './DetailForm.css';

export default class DetailForm extends Component {
  state = {};

  componentDidMount = () => {}

  renderNestedForm = (renderProps) => {
    const {
      metadata,
      debug,
      submitButtonText = 'Save',
      isLoading = false,
    } = this.props;
    const title = this.props.title || this.props.metadata.title || 'Form';
    const {
      // handleSubmit,
      pristine,
      // form,
      submitting,
      invalid,
      values,
    } = renderProps;

    return (
      <Fragment>
        <Typography variant="h5">
          {title}
        </Typography>
          
        <hr />
        
        {metadata.fields.map((field, index)=>{
          return (<Grid item xs={12} key={index} className="form-field-container">
            {renderFormField(field)}
          </Grid>);
        })}

        <Grid container alignItems="flex-start" spacing={8} style={{ 'marginTop': '20px' }}>
          <Grid item xs={6} align="left">
            {/* <Button
              variant="outlined"
              color="secondary"
              onClick={()=>{
                  this.resetConfirm(form);
              }}
              disabled={submitting}
              >
              Reset
              </Button> */}
          </Grid>
          <Grid item xs={6} align="right">
            <Button 
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading || submitting || invalid || pristine}
            >
              {submitButtonText}
            </Button>
          </Grid>
        </Grid>
        {
          debug &&
          <pre>{JSON.stringify((values || {}), 0, 2)}</pre>
        }
      </Fragment>
    );
  };

  render() {
    const {
      nested,
      loading,
      onSubmit,
      data,
      metadata,
      renderProps
    } = this.props;

    const title = this.props.title || this.props.metadata.title || 'Form';

    return (
      <div className="react-material-final-form">        
        {loading && 
          <Grid item xs={12} align="center">
            <CircularProgress />
          </Grid>}

        {
          metadata && nested && renderProps &&
            this.renderNestedForm(renderProps)
        }

        {
          metadata && !nested && title &&
          <Form
            onSubmit={onSubmit}
            mutators={{ setFieldData, ...arrayMutators }}
            initialValues={data}
            render={(props) => {
              return (
                <form onSubmit={props.handleSubmit}>
                  {this.renderNestedForm(props)}
                </form>
              );
            }}
          />
        }
      </div>);
  }
}
