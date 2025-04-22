const bcrypt = require('bcryptjs');
const saltRounds = 10; 

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Erro ao hashear a senha:', error);
        throw error;
    }
}

async function comparePassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Erro ao comparar senhas:', error);
        throw error;
    }
}

module.exports = { hashPassword, comparePassword };