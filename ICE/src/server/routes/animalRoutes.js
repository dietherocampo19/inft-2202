import express from "express";
import animalController from "../controllers/animal.js";
import { animalValidationRules, checkValidation } from "../middleWare/validation.js";

const router = express.Router();

router.get("/:name?", checkValidation, animalController.index);
router.post("/", animalValidationRules, checkValidation, animalController.add);
router.put("/", animalValidationRules, checkValidation, animalController.update);
router.delete("/:name?", animalController.delete);

export default router;
