import { Router } from "express";
import adoptionsController from "../controllers/adoptions.controller.js";
import { validateObjectId } from "../middleware/validation.js";

const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.get('/:aid', validateObjectId('aid'), adoptionsController.getAdoption);
router.post('/:uid/:pid', 
    validateObjectId('uid'), 
    validateObjectId('pid'), 
    adoptionsController.createAdoption
);

export default router;