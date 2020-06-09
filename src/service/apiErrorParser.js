function parseLoginError(err){
    let parsedError = {
        message: 'authentication error',
    }
    if (err.response){
        if (err.response && err.response.data.error && err.response.status === 401) {
            parsedError = {
                ...parsedError,
                message: err.response.data.error,
            };
        }
    }
    return parsedError;
}

export const errorParser = {
    parseLoginError
}

