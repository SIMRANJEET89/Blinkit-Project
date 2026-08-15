import {Router} from 'express'
import auth from '../middleware/auth.js'
import { addAddressController, getAddresController } from '../controllers/AddressController.js'


const addressRouter = Router()

addressRouter.post('/create', auth, addAddressController)
addressRouter.get('/get',auth, getAddresController)


export default addressRouter