import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class StreamForm extends Component {

    //component={} need props so formProps
    renderInput = (formProps) => {
        const { error, touched } = formProps.meta;
        const err = `field ${touched && error ? 'error' : ''}`

        return (
            <div className={ err } >
                <label style={ { marginTop: '20px' } }>{ formProps.fieldLabel }</label>
                {/* <input autoComplete="off" style={ { marginTop: '10px' } } onChange={ formProps.input.onChange } /> */ }
                <input autoComplete="off"  { ...formProps.input } ></input>
                { this.renderErrorMsg(error, touched) }
            </div>
        )
    }


    renderErrorMsg = (error, touched) => {
        if (touched && error)
            return (
                <div className="ui error message">
                    <div className="header"></div> <em>{ error }</em>
                </div>
            )
    }

    //here it is formvalues cos handle submit gives out values of the form
    onFormSubmit = (formValues) => {
        //on Submit is the prop sent from StreamCreate/StreamEdit
        this.props.onSubmit(formValues);
    }


    /*
        onSubmit=>form event listener
        handleSubmit=>listener of redux-form =>implicitly passes form values
        onFormSubmit=>method passed as prop down to StreamForm component
    */


    render() {
        return (
            <form className="ui form error" onSubmit={ this.props.handleSubmit(this.onFormSubmit) }>
                <Field name="title" type="text" component={ this.renderInput } fieldLabel="Enter Stream name"></Field>
                <Field name="description" type="text" component={ this.renderInput } fieldLabel="Enter Description"></Field>
                <button style={ { marginTop: '10px' } } className="ui button primary">Submit</button>
            </form>
        )
    }
}


const formValidations = (formValues) => {

    const error = {}
    if (!formValues.title)
        error.title = 'Title is mandatory'

    if (formValues.title && formValues.title.startsWith('.'))
        error.title = " Title must nor start with ' . ' "

    if (!formValues.description)
        error.description = 'description is mandatory'

    return error;
}


export default reduxForm({
    form: 'StreamForm',
    validate: formValidations
})(StreamForm)
