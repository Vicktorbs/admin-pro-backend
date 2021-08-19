const Hospital = require("../models/hospital")

const getHostpitals = async(req, res) => {

    const hospitals = await Hospital.find().populate('user', 'name img');
    res.json({
        ok: true,
        hospitals
    })
}
const createHostpital = async(req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    
    try {

        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error creating the new hospital'
        })
    }

}
const updateHostpitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateHospitals'
    })
}
const deleteHostpitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteHospitals'
    })
}

module.exports = {
    getHostpitals,
    updateHostpitals,
    createHostpital,
    deleteHostpitals
}