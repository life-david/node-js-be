const jwt = require('jsonwebtoken');

module.exports={
    createTokenPair: async function (payload, publicKey, privateKey) {
        try {
            // access token
            const accessToken =  await jwt.sign(payload, publicKey, {
                expiresIn: '2 days',
            });

            const refreshToken =  await jwt.sign(payload, privateKey, {
                expiresIn: '7 days',
            });

            jwt.verify(accessToken, publicKey, (err, decoded) => {
                if(err){
                    console.log('err verify', err);
                }else{
                    console.log('decoded verify', decoded);
                }
            });

            return {accessToken,refreshToken}

        } catch (error) {
            return {
                message: error.message
            }
        }
    }
}