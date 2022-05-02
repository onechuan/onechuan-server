
module.exports = function(sequelize, dataTypes){
    const Article = sequelize.define("Article",{
        id: {
            type: dataTypes.INTEGER(11), 
            primaryKey: true, 
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(255), 
            allowNull: false, 
            unique: true
        },
        description: {
            type: dataTypes.STRING(255), 
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        updatedAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        likes:{
            type: dataTypes.INTEGER(11), 
            defaultValue: 0
        },
        reads:{
            type: dataTypes.INTEGER(11), 
            defaultValue: 0
        }
    },{
        timestamps: true
    })

    return Article
}