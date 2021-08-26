
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "privateKey"); //vérifie le token de l'entête pour authentifier la requête
    const userId = decodedToken.userId;
    if (!userId) {
      throw 'veuillez vous authentifier...';
    } else {
      next();
    }
  } catch (e){
    res.status(401).json(e);
  }
};