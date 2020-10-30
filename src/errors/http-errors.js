const httpErrors = {
  BAD_REQUEST: [400, 'Bad Request'],
  UNAUTHORIZED: [401, 'Unauthorized'],
  NOT_FOUND: [404, 'Not Found'],
  INTERNAL_SERVER_ERROR: [500, 'Internal Server Error']
};

class ValidationError extends Error {
  constructor(error) {
    super();
    [this.code, this.message] = error;
  }
}

function errorsHandler(err, req, res) {
  if (err) {
    console.log(err, req, res);
  }
}

module.exports = { httpErrors, ValidationError, errorsHandler };
