const { DataTypes } = require('sequelize');
const sequelize = require('../util/db.js');
const uuid = require('uuid');

const User = sequelize.define('users', {
    uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lastLoginDate: {
        type: DataTypes.DATE
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '../public/images/user.png'
    },
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    sendInfo: {
        type: DataTypes.JSON,
        defaultValue: {
            user: '',
            password: '',
            smtp: "",
            port: 3000
        }
    }
}, {
    // 其他模型选项（如表名、索引等）
    timestamps: true
})

// var data = (async () => {
//     await User.sync({ force: true });

//     const sampleUsers = [
//         {
//             uid:120,
//             name: 'Alice',
//             password: 'alice123',
//             loginCount: 2,
//             lastLoginDate: new Date(),
//             state: 1,
//             sendInfo: {
//                 user: 'alice@example.com',
//                 password: 'emailpassword',
//                 smtp: 'smtp.example.com',
//                 port: 587
//             }
//         },
//         {
//             uid:121,
//             name: 'Bob',
//             password: 'bob456',
//             loginCount: 10,
//             lastLoginDate: new Date(),
//             state: 2,
//             sendInfo: {
//                 user: 'bob@example.com',
//                 password: 'emailpassword',
//                 smtp: 'smtp.example.com',
//                 port: 587
//             }
//         },
//         {
//             uid:122,
//             name: 'Charlie',
//             password: 'charlie123',
//             loginCount: 5,
//             lastLoginDate: new Date(),
//             state: 1,
//             sendInfo: {
//                 user: 'char@example.com',
//                 password: 'emailpassword',
//                 smtp: 'smtp.example.com',
//                 port: 587
//             }
//         },
//         {
//             uid: 123,
//             name: 'David',
//             password: 'david456',
//             loginCount: 10,
//             lastLoginDate: new Date(),
//             state: 2,
//             sendInfo: {
//                 user: 'david@example.com',
//                 password: 'emailpassword',
//                 smtp: 'smtp.example.com',
//                 port: 587
//             }
//         }
//         // Add more user objects as needed
//     ];

//     await User.bulkCreate(sampleUsers);

//     console.log('Sample users created.');
//     sequelize.close();
// })();


// 导出用户模型
module.exports = User;