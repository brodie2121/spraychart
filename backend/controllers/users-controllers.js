const bcrypt = require('bcryptjs');
User = require('../models/users-model'),

exports.user_page_get = async (req, res) => {
    const userInstance = new User(req.session.user_id, null, null, null, null, null),
        getUserInfo = await userInstance.getUserInfo();
            res.json(getUserInfo).status(200) ({
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
    });
}

/*exports.login_page_get = (req, res) => {
        res.status(200) ({
            is_logged_in: req.session.is_logged_in,
    });
}*/

exports.logout_get = (req, res) => {
    console.log('logging out');
    req.session.destroy();
}

exports.login_page_post = async (req, res) => {
    console.log("this is req body", req.body);
    const { email, password } = req.body,
        userInstance = new User(null, null, null,null, email, password, null);
    const userData = await userInstance.getUserByEmail();
    console.log("this is user data: ",userData);
        
    const isValid = bcrypt.compareSync(password, userData.password);
        if (!!isValid) {
        req.session.is_logged_in = true;
        req.session.user_id = userData.id;
        req.session.firstname = userData.firstname;
        req.session.lastname = userData.lastname;
        req.session.phone = userData.phone;
        req.session.coursename = userData.coursename;
        console.log('CORRECT PW!');
    } else {
        console.log('WRONG PW!');
        res.sendStatus(401);
    }
}

exports.sign_up_post = (req, res) => {
    const { firstname, lastname, phone, email, password, coursename } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 
    
    const userInstance = new User(null, firstname, lastname, phone, email, hash, coursename);
    userInstance.save().then(response => {
        req.session.firstname = response.firstname;
        req.session.lastname = response.lastname;
        req.session.user_id = response.id;
        req.session.phone = response.phone;
        req.session.email = response.email;
        req.session.coursename = response.coursename;
        res.redirect('/');
    });
}
