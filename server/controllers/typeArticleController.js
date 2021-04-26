const TypeArticle = require('../models/TypeArticle');


/**
 * @param {mongoose.ObjectId} _id 
 * @returns {TypeArticle} TypeArticle infos
 */
const getTypeById = async(_id) => {
    try {
        return await TypeArticle.findById(_id)
    } catch (error) {
        console.log(error)
        throw error;
    }
};


/**
 * @param {String} nameType new Name of article's type 
 * @param {String} iconType new icon of article's type 
 * @param {String} colorType new icon of article's type 
 * @returns {TypeArticle} created Type Article infos
 */
const createTypeArticle = async (nameType, iconType, colorType) => {
    try {
        const typeArticle = new TypeArticle({nameType, iconType, colorType})
        return await typeArticle.save()
        
    } catch (error) {
        console.log("error while creating the type of article");
        throw error;
    }
};

/**
 * @param {mongoose.ObjectId} _id 
 * @param {String} nameType new Name of article's type 
 * @param {String} iconType new icon of article's type 
 * @param {String} colorType new icon of article's type 
 * @returns {TypeArticle} updated Type Article infos
 */
const updateTypeArticle = async (_id,nameType, iconType, colorType) => {
    try {
        return await TypeArticle.findOneAndUpdate({_id},{nameType, iconType, colorType},{new:true});
    } catch (error) {
        throw error;
    }
};



/**
 * @param {mongoose.ObjectId} id 
 * @returns {Account} deleted Type Article infos
 */
const deleteTypeArticle = async (_id) => {
    try{
        console.log("deleted typeArticle : ", _id)
        return await TypeArticle.deleteOne({_id});
    }catch (error) {
        throw error;
    }
};

/**
 * @returns {[TypeArticle]} all Type Article in database
 */
const getAllTypes = async () => {
    try {
        const list = await TypeArticle.find()
        return list
    } catch (error) {
        console.log(error)
        throw error;
    }
};



module.exports = {
    getTypeById,
    createTypeArticle,
    updateTypeArticle,
    deleteTypeArticle,
    getAllTypes
};
