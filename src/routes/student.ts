import { Router } from 'express';
import * as yup from 'yup';
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

router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudent);
router.post(
  '/students',
  validationMiddleware(studentSchema),
  studentController.postStudent
);
router.put(
  '/students/:id',
  validationMiddleware(studentSchema),
  studentController.updateStudent
);
router.delete('/students/:id', studentController.removeStudent);

export default router;
