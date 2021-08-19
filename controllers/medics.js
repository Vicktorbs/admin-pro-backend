const Medic = require("../models/medic");

const getMedics = async(req, res) => {

    const medics = await Medic.find().populate('user', 'name img')
                                    .populate('hospital', 'name img');
    res.json({
        ok: true,
        medics
    })
}
const createMedic = async(req, res) => {

    const uid = req.uid;
    const medic = new Medic({
        user: uid,
        ...req.body
    });
    
    try {

        const medicDB = await medic.save();
        
        res.json({
            ok: true,
            medic: medicDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: true,
            msg: 'Error creating the new medic'
        })
    }

}
const updateMedic = (req, res) => {
    res.json({
        ok: true,
        msg: 'updateMedic'
    })
}
const deleteMedic = (req, res) => {
    res.json({
        ok: true,
        msg: 'deleteMedic'
    })
}

module.exports = {
    getMedics,
    updateMedic,
    createMedic,
    deleteMedic
}