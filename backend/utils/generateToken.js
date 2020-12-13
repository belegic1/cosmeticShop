import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    jwt.sign({id}, 'sssssss',{expiresIn: '30d'})
}

export default generateToken