import express from 'express'
import {Request, Response} from 'express'
import {User} from './models'
import {Chat} from './models'
const router = express.Router()

router.post('/readMsg', function (req: Request, res: Response) {
  const { to, from } = req.body
  Chat.updateMany({to, from}, {read: true})
    .then(doc => {
      console.log(doc)
    })
  return res.json({code: 0})
})

export default router