const User = require('../models/users');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            let { contact } = req.body;

            if (!contact) {
                return res.json({ success: false, message: 'Please provide contact no.' });
            }

            if (isNaN(contact) || contact.toString().length != 10) {
                return res.json({ success: false, message: 'Invalid Contact No.' })
            }

            let user = await User.findOne({ contact });
            console.log(user)
            if (!user) {
                const userId = `User-${contact}${Date.now()}`;
                user = await User.create({ userId, contact });
            }
            console.log(user)
            return res.json({ success: true, user });

        } catch (err) {
            return res.json({ message: err.message })
        }
    },
    updateUser: async (req, res, next) => {
        try {
            let { userId, name, gender, age, aadhaarNumber, panNumber, aadhaarProof, panProof } = req.body;

            if (!userId) {
                return res.json({ success: true, message: 'Please specify the user id' });
            }

            if (aadhaarNumber && (isNaN(aadhaarNumber) || aadhaarNumber.length != 12 || aadhaarNumber[0] == '0' || aadhaarNumber[0] == '1')) {
                return res.json({ success: false, message: 'Invalid Aadhar Number' });
            }

            let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;

            if (panNumber && !regex.test(panNumber)) {
                return res.json({ success: false, message: 'Invalid Pan Number' });
            }

            let user = await User.findOne({ userId });

            if (!user) {
                return res.json({ success: false, message: 'User not found' });
            }

            user.name = name || user.name;
            user.age = age || user.age;
            user.gender = gender || user.gender;
            user.aadhaarNumber = aadhaarNumber || user.aadhaarNumber;
            user.panNumber = panNumber || user.panNumber;
            user.aadhaarProof = aadhaarProof || user.aadhaarProof;
            user.panProof = panProof || user.panProof;

            if (user.aadhaarProof && user.panProof) {
                user.isVerified = true;
            }

            await user.save();

            return res.json({ success: true, user });
        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'Error Occurred!' });
        }
    }
}