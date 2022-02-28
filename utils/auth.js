import Jwt from 'jsonwebtoken'
export const singToken = (user) => {
  return Jwt.sign({ _id: user.id, name: user.name, email: user.email, isAmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '30d' })
}
