import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }, 
    {
        name: 'Dragan Belegic',
        email: 'belegic@example.com',
        password: bcrypt.hashSync('123456', 10),
    }, 
    {
        name: 'Jovan Jovanovic',
        email: 'jovan@example.com',
        password: bcrypt.hashSync('123456', 10),
    }, 
    
]

export default users