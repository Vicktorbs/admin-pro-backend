const fs =require('fs')
const Hospital = require("../models/hospital");
const Medic = require("../models/medic");
const User = require("../models/user");

const deleteOldPath = (path) => {
    if (fs.existsSync(path)) {
        // Delete old image
        fs.unlinkSync(path);
    }
}
const updateImagen = async(type, id, fileName) => {
    
    let oldPath = '';
    switch (type) {
        case 'medics':
            const medic = await Medic.findById(id);
            if (!medic) {
                console.log('Medic ot found by ID');
                return false
            }
            oldPath = `./uploads/medics/${ medic.img }`;
            deleteOldPath(oldPath)
            
            medic.img = fileName;
            await medic.save();
            return true;
            break;

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('Medic ot found by ID');
                return false
            }
            oldPath = `./uploads/users/${ user.img }`;
            deleteOldPath(oldPath)
            
            user.img = fileName;
            await user.save();
            return true;
            break;

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('Medic ot found by ID');
                return false
            }
            oldPath = `./uploads/hospitals/${ hospital.img }`;
            deleteOldPath(oldPath)
            
            hospital.img = fileName;
            await hospital.save();
            return true;
            break;
    
        default:
            break;
    }
}

module.exports = {
    updateImagen
}