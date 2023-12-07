export const errorHandler = (statusCode, message) => {
    const error = new Error()
    console.log(Error());
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

/* Custom error */