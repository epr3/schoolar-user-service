import { Router } from 'express';
import * as yup from 'yup';
import validationMiddleware from '../middlewares/validationMiddleware';
import adminController from '../controllers/admin';

const router = Router();

const adminSchema = yup.object().shape({
  name: yup.string().required(),
  userId: yup.string().required()
});

router.get('/admins', adminController.getAdmins);
router.get('/admins/:id', adminController.getAdmin);
router.post(
  '/admins',
  validationMiddleware(adminSchema),
  adminController.postAdmin
);
router.put(
  '/admins/:id',
  validationMiddleware(adminSchema),
  adminController.updateAdmin
);
router.delete('/admins/:id', adminController.removeAdmin);

export default router;
