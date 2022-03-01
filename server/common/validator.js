const Joi = require("joi")

exports.postingValidator = async(body) => {

    const schema = Joi.object({
        userId: Joi.string().alphanum().min(3).max(30).required(),
        title: Joi.string().max(100).required(),
        content: Joi.string().max(5000).required()

    });
    try {
        const result = await schema.validateAsync(body);
        return result
    } catch (error) {
        return {error}
    }

}