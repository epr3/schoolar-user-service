const { Router } = require('express');
const yup = require('yup');
const role = require('../utils/role');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const studentController = require('../controllers/student');

const router = Router();

const studentSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  groupId: yup.string(),
  telephone: yup.string().required(),
  userId: yup.string().required()
});

router.get('/students', jwtMiddleware, studentController.getStudents);
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

module.exports = router;
