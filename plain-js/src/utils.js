// We've put this function here just to demonstrate how we can test
// plain old JavaScript function using Mocha
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}