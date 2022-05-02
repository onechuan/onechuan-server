
module.exports = function(sequelize, dataTypes){
    const User = sequelize.define(
        "User", 
        {
            id:{
                type: dataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: dataTypes.STRING(50),
                allowNull: false
                // unique: true
            },
            password: {
                type: dataTypes.STRING,
                comment: '通过 bcrypt 加密后的密码' // 仅限站内注册用户
            },
            email: {
                type: dataTypes.STRING(50)
            },
            notice: {
                type: dataTypes.BOOLEAN, // 是否开启邮件通知
                defaultValue: true
            },
            role: {
                type: dataTypes.TINYINT,
                defaultValue: 0,
                comment: '用户权限：2 - super admin，1 - admin, 0 - 普通用户'
            },
            gender:{
                type: dataTypes.TINYINT,
                defaultValue: 2,
                comment: '性别：0 - 女，1 - 男， 2 - 未知'
            },
            createdAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW
            },
            updatedAt: {
                type: dataTypes.DATE,
                defaultValue: dataTypes.NOW
            },
            disabledDiscuss: {
                type: dataTypes.BOOLEAN, // 是否禁言
                defaultValue: false
            },
        },
        {
            timestamps: true
        }
    );

    // User.associate = models => {
    //     User.hasMany(models.comment)
    //     User.hasMany(models.reply)
    //     User.hasMany(models.ip)
    // }
    return User
};