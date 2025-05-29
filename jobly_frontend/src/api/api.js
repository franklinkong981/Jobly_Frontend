import axios from "axios";


//const BASE_URL = "http://localhost:3001";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

/** This is the top-level API class for the Jobly backend that the frontend will interact with to retrieve
 * data about companies, jobs, user, etc.
 * 
 * This is a static class tying together methods used to get/send to the API. There 
 * won't be any frontend-specific stuff here, and there won't be any API-aware stuff
 * elsewhere in the frontend.
 * 
 * All React components in frontend will interact through methods in this file to retrieve information from backend.
 */

class JoblyApi {
  //Whenever a user signs up/logs in to Jobly, they'll be issued a token which they'll need to 
  //access most of the routes. This token will be stored here.

  static token;

  //The main reusable method that will be called whenever the front end wants to send a request
  // to a certain route in the backend.

  static async request(endpoint, data = {}, method = "get") {
    console.log("API Call: ", endpoint, data, method);

    //This is one way to pass an authorization token: As part of the header.
    const url = `${BASE_URL}/${endpoint}`;
    console.log("URL for API call: ", url);
    const headers = (JoblyApi.token) ? {authorization: `Bearer ${JoblyApi.token}`} : {};
    const params = (method === "get") ? data : {};

    try {
      return (await axios({url, method, data, params, headers})).data;
    } catch(err) {
      console.error("API Error: ", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //Individual API routes

  /** Signs the user in, adds the new user information to the database, and generates a new token for the user.
   * The signupFormValues will contain the new user's username, password, first name, last name, and email.
   */
  static async signUp(signUpFormValues) {
    let res = await this.request(`auth/register`, signUpFormValues, "post");
    return res.token;
  }

  /** Logs in the user. The loginFormValues will contain the user's username and password. If the user is authenticated and
   * they are successful, logs the user in.
   */
  static async login(loginFormValues) {
    let res = await this.request(`auth/token`, loginFormValues, "post");
    return res.token;
  }

  /** Gets information about the current logged in user such as their first name, last name, and email.  */
  static async getCurrentLoggedInUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Updates logged in user's information in the database. Can update first name, last name, and/or email. */
  static async updateUserProfile(username, updateProfileFormValues) {
    let res = await this.request(`users/${username}`, updateProfileFormValues, "patch");
    return res.user;
  }

  /** Retrieve and get details on all companies currently in the database. GET request on /companies will return
   * an array of company objects like:
   *  [companies: { handle, name, description, numEmployees, logoUrl }, ...]
  */

  static async getAllCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** Retrieve and get details on a specific subset of companies based on a search filter. Will return an array of 
   * company objects that match the search query like:
   *  [companies: { handle, name, description, numEmployees, logoUrl }, ...]
   */

  static async getFilteredCompaniesByName(searchQuery) {
    let res = await this.request(`companies?name=${searchQuery}`);
    return res.companies;
  }

  /** Get details on a company by handle. GET request on /companies/:handle will return 
   * {company: { handle, name, description, numEmployees, logoUrl, jobs }
  *   where jobs is [{ id, title, salary, equity }} */
  
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get information about all jobs, GET request on /jobs will return an array of job objects
   * where each job object is { id, title, salary, equity, companyHandle, companyName }
   */
  static async getAllJobs() {
    let res = await this.request(`jobs`);
    return res.allJobs;
  }

  /** Get information about a specific subset of jobs based on a search filter. Will return an array of job objects
   * where each job object corresponds to a job that matches the search query and is { id, title, salary, equity, companyHandle, companyName }
   */
  static async getFilteredJobsByTitle(searchQuery) {
    let res = await this.request(`jobs?title=${searchQuery}`);
    return res.allJobs;
  }

  /** Lets the user apply to a job, and updates the status in the database. */
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  }

}

//For now, this is the test user that will be used to test the code while it is under development.
//This is the token that will be given to a user with username = "testuser", password = "password"
/* JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc"; */

export default JoblyApi;