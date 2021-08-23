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
const updateHostpitals = async(req, res) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital not found'
            })
        }

        const hospitlaChanges = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(id, hospitlaChanges, { new: true });

        res.json({
            ok: true,
            hospital: hospitalUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hospital no updated'
        })
    }
}
const deleteHostpitals = async(req, res) => {
    const id = req.params.id;
    try {
        const hospital = await Hospital.findById(id);

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital not found'
            })
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital deleted'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hospital no deleted'
        })
    }
}

module.exports = {
    getHostpitals,
    updateHostpitals,
    createHostpital,
    deleteHostpitals
}