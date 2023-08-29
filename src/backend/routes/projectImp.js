const { INTEGER, NUMBER } = require('sequelize')
var projectClass = require('./project')
const { DataTypes } = require('@sequelize/core')
var project = new projectClass()
var interface = [
    {
        "method":"POST",
        "path": "/project/create",
        "param":{
            name:{
                type: String
            },
            uid:{
                type: Number,
            },
            dis:{
                optional:1, //可填可不填
                type:String
            },
            baseUrl:{
                optional:1,
                type:String
            }
        },
        "data":{},
        user:1, // 值为1表示需要用户验证
        // [创建该项目]
        handle:[project.create]
    },
    {
        "method": "POST",
        "path":"/project/edit",
        "param":{
            gid:{
                type:Number
            },
            name:{
                type: String
            },
            dis:{
                type: String,
                optional:1
            },
            baseUrl:{
                type: String,
                optional:1
            }
        },
        "data":String,
        user:1,
        // [检查用户是否有权限访问该项目，添加该用户]
        handle:[project.edit]    
    },
    {
        "method":"POST",
        "path":"/project/member",
        "param":{
            name:{
                type:String
            },
            uid:{
                type:INTEGER
            },
            role:{
                type:String,
                // validate:{
                //     // 0 - 管理者，1 - 读写，2 - 游客
                //     in:[0,1] 
                // }
            },
            gid:{
                type:INTEGER
            }
        },
        "data":String,
        user:1,
        // [检查用户是否有权限访问该项目，添加该用户]
        handle:[project.addMember]
    },
    {
        "method":"POST",
        "path":"/project/role",
        "param":{
            uid:{
                type:Number
            },
            uid_c:{
                type:Number
            },
            gid:{
                type:INTEGER
            },
            role:{
                type:String,
            },
        },
        "data":String,
        user:1,
        handle:[project.role]
    },
    {
        "method":"GET",
        "path":"/project/role",
        "param":{
            uid:{
                type:Number
            },
            name:{ // group name
                type:String
            }
        },
        "data":String,
        user:1,
        handle:[project.getRole]
    },
    {
        "method":"DELETE",
        "path":"/project/member",
        "param":{
            name:{
                type:String
            },
            gid:{
                type:Number
            },
        },
        "data":String,
        user:1,
        handle:[project.removeMember]
    },
    {
        "method":"GET",
        "path":"/project/list",
        "param":{
            gid:{
                type: Number
            },
        },
        "data":{

        },
        user:1,
        handle:[project.list]
    },
    {
        "method":"POST",
        "path":"/project/list",
        "param":{
            gid:{
                type: Number
            },
            name:{
                type: String
            }
        },
        "data":{

        },
        user:1,
        handle:[project.addlist]
    },
    {
        "method": "POST",
        "path": "/project/listedit",
        "param":{
            name:{ // 修改前项目的名称
                type: String,
            },
            new_name:{
                type: String,
                optional:1
            },
            gid:{
                type: Number,
                optional:1
            },
            dis:{
                type:String,
                optional:1
            },
            baseUrl:{
                type:String,
                optional:1
            }          
        },
        user:1,
        handle:[project.editProject]
    },
    {
        "method":"DELETE",
        "path":"/project/list",
        "param":{
            gid:{
                type: Number
            },
            name:{
                type: String
            }
        },
        "data":{

        },
        user:1,
        handle:[project.clearList]
    },
    {
        "method":"GET",
        "path":"/project/info",
        "param":{
            uid:{
                type:Number
            }
        },
        "data":{

        },
        user:1,
        handle:[project.info]
    },
    {
        "method":"DELETE",
        "path":"/project/item",
        "param":{
            gid:{
                type:Number,
            },
            uid:{
                type:Number
            }
        },
        "data":{

        },
        user:1,
        handle:[project.clearProject]
    },
    {
        "method":"DELETE",
        "path":"/project/quit",
        "param":{
            gid:{
                type:Number
            },
            uid:{
                type:Number
            }
        },
        "data":{

        },
        user:1,
        handle:[project.quit]
    },
    // {
    //     "method":"PUT",
    //     "path":"/project/user",
    //     "param":{
    //         id:String,
    //         user:String
    //     },
    //     user:1,
    //     handle:[project.setUser]
    // },
    {
        "method":"GET",
        "path":"/project/user",
        "param":{
            gid: {
                type: INTEGER
            },
            uid:{
                type: INTEGER
            }
        },
        "data":{

        },
        user:1,
        handle:[project.getUsers]
    }
]

module.exports = interface