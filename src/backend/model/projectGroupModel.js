const { DataTypes } = require('sequelize');
const sequelize = require('../util/db'); // 使用 Sequelize 连接的数据库实例
const { User } = require('./userModel')
const uuid = require('uuid')

const projectGroup = sequelize.define('project_group', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        optional: 1,
        autoIncrement: true
    },
    gid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dis: {
        type: DataTypes.STRING,
    },
    baseUrl: {
        type: DataTypes.STRING,
        defaultValue: '/'
    }
}, {
    timestamps: true
});

// var data = (async() => {
//     try {
//         await projectGroup.sync({ force: true }); // 清空并重新创建表

//         const sampleData = [{
//                 id: 1,
//                 gid: 1001,
//                 name: 'test1',
//                 baseUrl: '/list'
//             },
//             {
//                 gid: 1002,
//                 name: 'test2'
//             },
//             // 添加更多示例数据
//         ];

//         await projectGroup.bulkCreate(sampleData);

//         console.log('Sample data created in project_group table.');
//         sequelize.close();
//     } catch (error) {
//         console.error('Error creating sample data:', error);
//     }
// })();

module.exports = projectGroup;