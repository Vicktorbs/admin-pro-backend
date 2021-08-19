const getMedics = (req, res) => {
    res.json({
        ok: true,
        msg: 'getMedics'
    })
}
const createMedic = (req, res) => {
    res.json({
        ok: true,
        msg: 'createMedic'
    })
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