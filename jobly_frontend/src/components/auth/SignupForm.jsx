import React, {useState} from "react";
import {useFormik} from "formik";

function SignupForm({signUpFunc}) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    },
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
        <label htmlFor="username=field">Username: </label>
        <input id="username-field" className="SignupForm-username-field" type="text" name="username"
        size="50" value={formik.values.username} onChange={formik.handleChange}/><br/>

        <label htmlFor="password=field">Password: </label>
        <input id="password-field" className="SignupForm-password-field" type="password" name="password"
        size="50" value={formik.values.password} onChange={formik.handleChange}/><br/>

        <label htmlFor="firstName-field">First Name: </label>
        <input id="firstName-field" className="SignupForm-firstName-field" type="text" name="firstName"
        size="50" value={formik.values.firstName} onChange={formik.handleChange}/><br/>

        <label htmlFor="lastName-field">Last Name: </label>
        <input id="lastName-field" className="SignupForm-lastName-field" type="text" name="lastName"
        size="50" value={formik.values.lastName} onChange={formik.handleChange}/><br/>

        <label htmlFor="email-field">Email: </label>
        <input id="email-field" className="SignupForm-email-field" type="email" name="email"
        size="50" value={formik.values.email} onChange={formik.handleChange}/><br/>

        <button className="SignUpForm-submit-button" type="submit">Create Account</button>
      </form>
    </section>
  );
}

export default SignupForm;