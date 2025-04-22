const User = require('../models/User');
const bcryptUtils = require('../utils/bcryptUtils');

async function registerUser(req, res) {
    try {
        const { nome_cliente, email_cliente, senha_cliente } = req.body;

       
        const existingUserByEmail = await User.findOne({ where: { email_cliente } });
        if (existingUserByEmail) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        
        const hashedPassword = await bcryptUtils.hashPassword(senha_cliente);

        const user = await User.create({
            nome_cliente,
            email_cliente,
            senha_cliente: hashedPassword 
        });

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: { id_cliente: user.id_cliente, nome_cliente: user.nome_cliente, email_cliente: user.email_cliente }
        });

    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
}

async function getUserById(req, res) {
    
}

module.exports = { registerUser, getUserById };