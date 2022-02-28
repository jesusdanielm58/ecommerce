import dataUsers from '../../utils/dataUser'
import { singToken } from '../../utils/auth'

export default function handler (req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    // const body = JSON.parse(req.body)
    console.log('pasa api post user', req.email, req.body)
    const user = dataUsers.find((user) => user.email === req.body.email && user.password === req.body.password)
    if (user) {
      const token = singToken(user)
      res.send({ token, ...user })
    } else {
      res.status(401).send({ message: 'invalid user or password' })
    }
  }
}
