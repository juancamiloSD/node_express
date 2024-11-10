const path = require("path");
const { v4: uuidv4 } = require("uuid");

const uploadFile = (files, extensionsValidate = ["png", "jpg", "jpeg", "gif"], carpeta = "") => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameSplit = file.name.split(".");
        const extension = nameSplit[nameSplit.length - 1]
        
        // Validate extension
        if( !extensionsValidate.includes(extension)){
            return reject(`La extensión ${extension} no es permitida - ${extensionsValidate}`);
        }
        const nameTemp = uuidv4() + "." + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nameTemp );

        file.mv(uploadPath, (err) => {
            if (err) {
                return reject(err)
            }
            return resolve (nameTemp);
        }); 
    });
}


module.exports = {
    uploadFile
}