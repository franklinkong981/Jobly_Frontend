import React, {useState} from "react";
import {useFormik} from "formik";

const validate = values => {
	const errors = { };
	if (!values.username) {
		errors.username = 'Required';
	} else if (values.username.length > 30) {
		errors.username = 'Username must be 30 characters or less';
	}

	if (!values.password) {
		errors.password = 'Required';
	} else if (values.password.length < 5 || values.password.length > 20) {
		errors.password = "Password must be between 5 and 20 characters";
	}

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 30) {
    errors.firstName = "First name must be 30 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length < 30) {
    errors.lastName = "Last name must be 30 characters or less";
  }

	if (!values.email) {
		errors.email = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Must be a valid email address";
	}

	return errors;
};


function SignupForm({signUpFunc}) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      await signUpFunc(values);
    }
  });


  return (
    <section className="col-md-4">
      <h1>Sign Up For Jobly</h1>
      <form className="SignUpForm" onSubmit={formik.handleSubmit}>
        <label htmlFor="username-field">Username: </label>
        <input id="username-field" className="SignupForm-username-field" type="text" name="username"
        size="50" value={formik.values.username} onChange={formik.handleChange}/><br/>
        {formik.errors.username ? <div>{formik.errors.username}</div> : null}

        <label htmlFor="password-field">Password: </label>
        <input id="password-field" className="SignupForm-password-field" type="password" name="password"
        size="50" value={formik.values.password} onChange={formik.handleChange}/><br/>
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <label htmlFor="firstName-field">First Name: </label>
        <input id="firstName-field" className="SignupForm-firstName-field" type="text" name="firstName"
        size="50" value={formik.values.firstName} onChange={formik.handleChange}/><br/>
        {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

        <label htmlFor="lastName-field">Last Name: </label>
        <input id="lastName-field" className="SignupForm-lastName-field" type="text" name="lastName"
        size="50" value={formik.values.lastName} onChange={formik.handleChange}/><br/>
        {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

        <label htmlFor="email-field">Email: </label>
        <input id="email-field" className="SignupForm-email-field" type="email" name="email"
        size="50" value={formik.values.email} onChange={formik.handleChange}/><br/>
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <button className="SignUpForm-submit-button" type="submit">Create Account</button>
      </form>
    </section>
  );
}

export default SignupForm;