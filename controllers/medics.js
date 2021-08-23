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
const updateMedic = async(req, res) => {
    const id = req.params.id;
    const uid = req.uid;
    try {
        const medic = await Medic.findById(id);

        if (!medic) {
            return res.status(404).json({
                ok: true,
                msg: 'Medic not found'
            })
        }

        const medicChanges = {
            ...req.body,
            user: uid
        }

        const medicUpdated = await Medic.findByIdAndUpdate(id, medicChanges, { new: true });

        res.json({
            ok: true,
            medic: medicUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Medic no updated'
        })
    }
}

const deleteMedic = async(req, res) => {
    const id = req.params.id;
    try {
        const medic = await Medic.findById(id);

        if (!medic) {
            return res.status(404).json({
                ok: true,
                msg: 'Medic not found'
            })
        }

        await Medic.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Medic deleted'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Medic no deleted'
        })
    }
}

module.exports = {
    getMedics,
    updateMedic,
    createMedic,
    deleteMedic
}