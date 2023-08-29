const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Group = sequelize.define('groups', {
    gid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING
    },
    dis: {
        type: DataTypes.STRING
    },
    baseUrls: {
        type: DataTypes.STRING
    },
    users: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    createdAt: {
        type: DataTypes.DATE, // 日期时间类型
        allowNull: false // 不允许为空
    }
}, {
    timestamps: true
});

// var data=(async () => {
//   try {
//     await sequelize.sync({ force: true }); // 清空并重新创建表格

//     const sampleGroups = [
//       {
//         gid: 1001,
//         name: 'Group A',
//         dis: 'Description for Group A',
//         baseUrls: 'http://groupa.example.com',
//         users: [
//           { id: 120, role: 'owner' },
//           { id: 121, role: 'member' }
//         ]
//       },
//       {
//         gid: 1002,
//         name: 'Group B',
//         dis: 'Description for Group B',
//         baseUrls: 'http://groupb.example.com',
//         users: [
//           { id: 122, role: 'member' },
//           { id: 123, role: 'guest' }
//         ]
//       },
//       // Add more groups as needed
//     ];

//     await Group.bulkCreate(sampleGroups);

//     console.log('Sample groups created.');
//     sequelize.close();
//   } catch (error) {
//     console.error('Error creating sample groups:', error);
//   }
// })();

module.exports = Group;