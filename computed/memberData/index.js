function queryMember(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        queryMember(db, function(result) {
            console.log(result);
            db.close();
        });
    });
    var queryMember = function(db, callback) {
        //连接到表 site
        var collection = db.collection('memberData');
        //查找是否有该用户
        var whereName = {
            membername: new RegExp(req.body.membername)
        }
        collection.find(whereName).toArray(function (err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
                res.json({
                    code:400,
                    message:err
                })
            }else{
                for(var i=0;i<result.length;i++){
                    if(result[i].expiretime){
                        if(Number(result[i].expiretime.replace(/-/g,""))<req.body.nowtime){
                            result[i].state = 0
                        }else {
                            result[i].state = 1
                        }
                    }
                }
                res.json({
                    code:200,
                    list:result,
                    count:result.length,
                    message:"请求成功",
                })
            }
        })

    }
}


function addMember(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        addMember(db, function(result) {
            console.log(result);
            db.close();
        });
    });
    var addMember = function(db, callback) {
        //连接到表 site
        var collection = db.collection('memberData');
        //查找是否有该用户
        var addmemberData = {
            membername: req.body.membername,
            expiretime: req.body.expiretime,
            phone: req.body.phone,
            weixin: req.body.weixin
        }
        collection.insert(addmemberData,function (err, result) {
            if(err){
                res.json({
                    code:400,
                    message:err
                })
            }else{
                res.json({
                    code:200,
                    message:"添加成功"
                })
            }
        })

    }
}

exports.queryMember = queryMember
exports.addMember = addMember