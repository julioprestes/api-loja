import jwt from 'jsonwebtoken';
import Users from "../models/UsersModel.js";

export default async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const user = jwt.verify(token, process.env.TOKEN_KEY);

        const usuario = await Users.findOne({
            where: {
                id: user.idUsers
            },
            attributes: [], 
        });

        if (!usuario) {
            return res.status(404).send({
                message: 'Usuário não encontrado'
            });
        }

        console.log(usuario.cargo.id);

        if (usuario.cargo.id !== 1) {
            return res.status(404).send({
                message: 'Cargo do usuário incorreto'
            });
        }

        console.log('Users e cargo OK');
        next();

    } catch (error) {
        return res.status(500).send({
            error: error.message
        });
    }
};