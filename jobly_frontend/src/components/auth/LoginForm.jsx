import React, {useState} from "react";
import {useFormik} from "formik";

function LoginForm({loginFunc}) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    async onSubmit(values) {
      await loginFunc(values);
    }
  });


  return (
    <section className="col-md-4">
      <h1>Log In to Jobly</h1>
      <form className="LoginForm" onSubmit={formik.handleSubmit}>
        <label htmlFor="username-field">Username: </label>
        <input id="username-field" className="LoginForm-username-field" type="text" name="username"
        size="50" value={formik.values.username} onChange={formik.handleChange}/><br/>

        <label htmlFor="password-field">Password: </label>
        <input id="password-field" className="LoginForm-password-field" type="password" name="password"
        size="50" value={formik.values.password} onChange={formik.handleChange}/><br/>

        <button className="LoginForm-submit-button" type="submit">Log In</button>
      </form>
    </section>
  );
}

export default LoginForm;