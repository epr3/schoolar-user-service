import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import professorController from '../controllers/professor';

const router = Router();

const professorSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  title: yup.string().required(),
  telephone: yup.string().required(),
  userId: yup.string().required()
});

router.get('/professors', professorController.getProfessors);
router.get('/professors/:id', professorController.getProfessor);
router.post(
  '/professors',
  validationMiddleware(professorSchema),
  professorController.postProfessor
);
router.put(
  '/professors/:id',
  validationMiddleware(professorSchema),
  professorController.updateProfessor
);
router.delete('/professors/:id', professorController.removeProfessor);

export default router;
