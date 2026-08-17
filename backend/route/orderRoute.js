import {Router} from 'express'
import auth from '../middleware/auth.js'
import { CODController } from '../controllers/orderController.js'

const orderRouter = Router()

orderRouter.post('/cash-on-delivery', auth, CODController)


export default orderRouter