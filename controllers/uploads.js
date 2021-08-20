const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require('../helpers/update-imagen');

const fileUpload = (req, res) => {
    const type = req.params.type;
    const id = req.params.id;

    const validTypes = ['medics', 'users', 'hospitals'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'Type invalid'
        })
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.' 
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const shortName = file.name.split('.');
    const fileExtencion = shortName[shortName.length - 1];

    // Validate extencion file
    const validExtencions = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtencions.includes(fileExtencion)) {
        return res.status(400).json({
            ok: false,
            msg: 'File extencion invalid.' 
        });
    }

    // Genereate file name
    const fileName = `${ uuidv4() }.${ fileExtencion }`;

    // Path to save image
    const path = `./uploads/${ type }/${ fileName }`;

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error moving the image'
            })

        }

        // Update database
        updateImagen(type, id, fileName)

        res.json({
            ok: true,
            fileName,
            msg: 'File uploaded!'
        });
    });

}

module.exports = {
    fileUpload
}