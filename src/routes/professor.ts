import { Router } from 'express';
import * as yup from 'yup';
import role from '../utils/role';
import roleMiddleware from '../middlewares/roleMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import jwtMiddleware from '../middlewares/jwtMiddleware';
import professorController from '../controllers/professor';

const router = Router();

const professorSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  title: yup.string().required(),
  telephone: yup.string().required(),
  userId: yup.string().required()
});

router.get(
  '/professors',
  jwtMiddleware,
  professorController.getProfessors
);
router.get(
  '/professors/:id',
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  professorController.getProfessor
);
router.post(
  '/professors',
  validationMiddleware(professorSchema),
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  professorController.postProfessor
);
router.put(
  '/professors/:id',
  validationMiddleware(professorSchema),
  jwtMiddleware,
  roleMiddleware([role.ADMIN, role.PROFESSOR]),
  professorController.updateProfessor
);
router.delete(
  '/professors/:id',
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  professorController.removeProfessor
);

export default router;
