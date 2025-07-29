import mongoose from "mongoose";

export const validateObjectId = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                status: "error", 
                error: `Invalid ${paramName.replace('id', ' ID')} format`
            });
        }
        next();
    };
};