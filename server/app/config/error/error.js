class Invalid extends Error {
  constructor (field) {
    super(`Field  ${field} has an invalid input value!`);
    this.name = "Invalid";
  }
};

class NotFound extends Error {
  constructor (subject) {
    super(`Couldn't find any ${subject}!`);
    this.name = "NotFound";
  }
};

class NotSupported extends Error {
  constructor () {
    super("Type not supported!");
    this.name = "NotSupported";
  }
};

class Duplicity extends Error {
  constructor (field) {
    super(`The value provided for ${field} already exists!`);
    this.name = "Duplicity";
  }
};

const checkMiddlewareErrorStatusCode = (err) => {
  if (err instanceof Invalid) {
    return 400;
  } else if (err instanceof NotFound) {
    return 404;
  } else if (err instanceof NotSupported || err instanceof Duplicity) {
    return 406;
  } else {
    return 500;
  }
};

export { Duplicity, Invalid, NotFound, NotSupported, checkMiddlewareErrorStatusCode };