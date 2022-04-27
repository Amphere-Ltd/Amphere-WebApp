import {sessionKeys} from './local-storage';

let instance;

class ErrorHandler {
  constructor() {
    if (instance) {
      throw new Error('Cannot create multiple instances of ErrorHandler');
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  errorsExist() {
    const errors = localStorage.getItem(sessionKeys.ERRORS);
    return errors !== null && errors.length > 0;
  }

  addError(err) {
    const errors = localStorage.getItem(sessionKeys.ERRORS);
    if (errors === null) {
      localStorage.setItem(sessionKeys.ERRORS, err);
    } else {
      const updatedErrs = `${errors} \n${err}`;
      localStorage.setItem(sessionKeys.ERRORS, updatedErrs);
    }
  }

  dumpErrors() {
    return localStorage.getItem(sessionKeys.ERRORS);
  }
}


const errorHandler = Object.freeze(new ErrorHandler());
export default errorHandler;
