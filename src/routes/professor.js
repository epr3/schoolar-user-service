const { Router } = require('express');
const yup = require('yup');
const role = require('../utils/role');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const professorController = require('../controllers/professor');

const router = Router();

const professorSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  title: yup.string().required(),
  telephone: yup.string().required(),
  userId: yup.string().required()
});

router.get('/professors', jwtMiddleware, professorController.getProfessors);
router.get('/professors/:id', jwtMiddleware, professorController.getProfessor);
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

module.exports = router;
