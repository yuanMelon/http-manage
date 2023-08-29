const DataTypes = require('sequelize')
const db = require('../util/db')

const Interface = db.define('saveinterface', {
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    uid: {
        type: DataTypes.STRING
    },
    pid: {
        type: DataTypes.STRING
    },
    // gid:{
    //     type: DataTypes.INTEGER,
    //     allowNull:false
    // },
    c_time: {
        type: DataTypes.DATE
    },
    u_time: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },
    desc: {
        type: DataTypes.STRING
    },
    req_params: {
        type: DataTypes.STRING
    },
    req_query: {
        type: DataTypes.STRING
    },
    req_body_from: {
        type: DataTypes.STRING
    },
    res_body: {
        type: DataTypes.STRING
    },
    res_body_type: {
        type: DataTypes.STRING
    },
    method: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true // 不使用默认的 createdAt 和 updatedAt 字段
});

// var data = (async() => {
//     await Interface.sync({ force: true });

//     const sampleInterfaces = [{
//             path: '/api/user',
//             title: 'User API',
//             uid: 121,
//             // gid:1001,
//             pid: 1,
//             c_time: new Date(),
//             u_time: new Date(),
//             status: 'active',
//             desc: 'API for managing users',
//             req_params: 'id',
//             req_query: 'name,email',
//             req_body_from: 'form-data',
//             res_body: '{"message": "User data"}',
//             res_body_type: 'application/json',
//             method: 'GET'
//         },
//         {
//             path: '/api/product',
//             title: 'Product API',
//             uid: 120,
//             // gid:1001,
//             pid: 1,
//             c_time: new Date(),
//             u_time: new Date(),
//             status: 'inactive',
//             desc: 'API for managing products',
//             req_params: 'id',
//             req_query: 'name,category',
//             req_body_from: 'raw',
//             res_body: '{"message": "Product data"}',
//             res_body_type: 'application/json',
//             method: 'POST'
//         },
//         {
//             path: '/api/member',
//             title: 'User API',
//             uid: 121,
//             pid: 2,
//             // gid:1002,
//             c_time: new Date(),
//             u_time: new Date(),
//             status: 'active',
//             desc: 'API for managing users',
//             req_params: 'id',
//             req_query: 'name,email',
//             req_body_from: 'form-data',
//             res_body: '{"message": "User data"}',
//             res_body_type: 'application/json',
//             method: 'POST'
//         }
//         // Add more interface objects as needed
//     ];

//     await Interface.bulkCreate(sampleInterfaces);

//     console.log('Sample interfaces created.');
// })();

module.exports = Interface;