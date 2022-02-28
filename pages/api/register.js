import { singToken } from '../../utils/auth'

export default function handler (req, res) {
  if (req.method === 'POST') {
    const user = { name: req.body.name, email: req.body.email, password: req.body.password, isAdmin: false }
    const token = singToken(user)
    res.send({ token, ...user })
  } else {
    res.status(401).send({ message: 'invalid user or password' })
  }
}
