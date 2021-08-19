const Hospital = require("../models/hospital");
const Medic = require("../models/medic");
const User = require("../models/user");

const getSearchs = async(req, res) => {

    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    
    // const users = await User.find({name: regex});
    // const medics = await Medic.find({name: regex});
    // const hospitals = await Hospital.find({name: regex});

    const [users, medics, hospitals] = await Promise.all([
        User.find({name: regex}),
        Medic.find({name: regex}),
        Hospital.find({name: regex})
    ])

    res.json({
        ok: true,
        users,
        medics,
        hospitals
    })
}

const getDocumentsByColection = async(req, res) => {

    const collection = req.params.collection;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    let data;

    switch (collection) {
        case 'users':
            data = await User.find({name: regex});
            break;

        case 'medics':
            data = await Medic.find({name: regex}).populate('user', 'name img')
                                                    .populate('hospital', 'name img');
            break;

        case 'hospitals':
            data = await Hospital.find({name: regex}).populate('user', 'name img');
            break;
    
        default:
             return res.json({
                ok: false,
                msg: 'Collection should be user/medics/hospitals'
            })
    }

    res.json({
        ok: true,
        results: data
    })

}

module.exports = {
    getSearchs,
    getDocumentsByColection
}