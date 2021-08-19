const getHostpitals = (req, res) => {
    res.json({
        ok: true,
        msg: 'getHospitals'
    })
}
const createHostpital = (req, res) => {
    res.json({
        ok: true,
        msg: 'createHostpital'
    })
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