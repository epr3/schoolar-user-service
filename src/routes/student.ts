import { Router } from 'express';
import * as yup from 'yup';
import role from '../utils/role';
import jwtMiddleware from '../middlewares/jwtMiddleware';
import roleMiddleware from '../middlewares/roleMiddleware';
import validationMiddleware from '../middlewares/validationMiddleware';
import studentController from '../controllers/student';

const router = Router();

const studentSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  groupId: yup.string(),
  telephone: yup.string().required(),
  userId: yup.string().required()
});

router.get(
  '/students',
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  studentController.getStudents
);
router.get(
  '/students/:id',
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  studentController.getStudent
);
router.post(
  '/students',
  validationMiddleware(studentSchema),
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  studentController.postStudent
);
router.put(
  '/students/:id',
  validationMiddleware(studentSchema),
  jwtMiddleware,
  roleMiddleware([role.ADMIN, role.STUDENT]),
  studentController.updateStudent
);
router.delete(
  '/students/:id',
  jwtMiddleware,
  roleMiddleware([role.ADMIN]),
  studentController.removeStudent
);

export default router;
