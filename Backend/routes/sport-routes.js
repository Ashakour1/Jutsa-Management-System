import express from 'express'

import { registerSport,getAllSports,getSingleSport, deleteSport, updateSport} from '../controllers/sports-controller'


const router = express.Router();

router.post('/sports',registerSport)

router.get('/sports',getAllSports)

router.get('/sports/:id',getSingleSport)

router.put('/sports/:id',updateSport)

router.delete('/sports/:id',deleteSport)

export default router;