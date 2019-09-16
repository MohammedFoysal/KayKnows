const bcrypt = require('bcrypt');

exports.hashPassword = async (rawPassword) => {

    const password = rawPassword
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

exports.comparePassword = async (rawPassword, hash) => {
    const result = await new Promise((resolve, reject) => {
        bcrypt.compare(rawPassword, hash, function (err, res) {
            if (err) { 
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });

    return result;
}
