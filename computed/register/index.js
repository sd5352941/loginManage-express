function insertData(req,res,DB_CONN_STR,MongoClient){
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        insert(db, function(result) {
            console.log(result);
            db.close();
        });
    });

    var insert = function(db, callback) {
        //连接到表 site
        var collection = db.collection('userData');
        //查询用户名是否重复
        var whereName = {"username":req.body.username}
        collection.find(whereName).toArray(function (err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
                res.json({
                    code:400,
                    message:err
                })
            }else if(result.length==0){
                //添加用户
                var data = {
                    "name":req.body.name,
                    "username":req.body.username,
                    "password":req.body.password
                };
                collection.insert(data, function(err, result) {
                    if(err)
                    {
                        console.log('Error:'+ err);
                        return;
                    }else {
                        res.json({
                            code:200,
                            message:"注册成功"
                        })
                    }
                    callback(result);
                });
            }else {
                res.json({
                    code:400,
                    message:"已有相同的用户名"
                })
            }
        })

    }
}

function login(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        login(db, function(result) {
            db.close();
        });
    });
    var login = function(db, callback) {
        //连接到表 site
        var collection = db.collection('userData');
        //查找是否有该用户
        var whereName = {"username":req.body.username}
        collection.find(whereName).toArray(function (err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
                res.json({
                    code:400,
                    message:err
                })
            }else if(result.length!=0){
                //验证密码
                if(result[0].password==req.body.password){
                    res.json({
                        code:200,
                        message:"登陆成功",
                        token:result[0]._id,
                        name:result[0].name
                    })
                }else{
                    res.json({
                        code:400,
                        message:"账号或密码错误！"
                    })
                }
            }else{
                res.json({
                    code:400,
                    message:"账号或密码错误！"
                })
            }
        })

    }
}

exports.insertData = insertData
exports.login = login





