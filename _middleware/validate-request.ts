export default validateRequest;

function validateRequest(req: any, next: any, schema: any) {
    const options = {
        abortEarly: false, //include all errors
        allowUnknown: true, //allow unknown keys
        stripUnknown: true //remove unknown keys
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    } else {    
    req.body = value;
    next();
    }
}


