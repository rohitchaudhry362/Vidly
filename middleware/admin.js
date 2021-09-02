function admin(req,res,next){
    // as this middleware will be executed after authorization middleware,
    // auth middlware sets req.user value
    // so, it can be access from here

    //401 Unauthorized
    //403 Forbidden

    if(!req.user.isAdmin) return res.status(403).send('Access Denied');
    next();
}

module.exports = admin;