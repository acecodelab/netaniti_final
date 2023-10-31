import { Router } from 'express'
const router = Router();


//Signup Routes Start
import dashboardGridController from '../../../controller/common/DashboardGrid/dashboard_grid_controller.js'
import dashboardGridMiddleware from '../../../middleware/common/DashboardGrid/dashboard_grid_middleware.js'

router.post("/getGrid", dashboardGridMiddleware.getGridValidations, dashboardGridMiddleware.getGridCheckRules, dashboardGridController.getGrid);

//Signup routes End

export default router