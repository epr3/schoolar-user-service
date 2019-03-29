import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import testController from '../controllers/test';

const router = Router();

const testSchema = yup.object().shape({
  code: yup.string(),
  publicTest: yup.boolean().required(),
  subjectId: yup.string().required()
});

router.get('/tests', testController.getTests);
router.get('/tests/:id', testController.getTest);
router.post(
  '/tests',
  validationMiddleware(testSchema),
  testController.postTest
);
router.put(
  '/tests/:id',
  validationMiddleware(testSchema),
  testController.updateTest
);
router.delete('/tests/:id', testController.removeTest);

export default router;
