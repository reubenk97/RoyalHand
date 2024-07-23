const extractValidationErrors = (err) => {
    const validationErrors = {};
    if (err.name === 'ValidationError') {
        for (const field in err.errors) {
            console.log(field);
            if(Object.hasOwn(err.errors, field)) {
                const errorMessage = err.errors[field].message;
                validationErrors[field] = errorMessage;
            }
        }
    }
    return validationErrors;
}

export default extractValidationErrors;