var ObjectID = require('mongodb').ObjectID;

function addActivity(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        add(db, function(result) {
            db.close();
        });
    });
    var add = function(db, callback) {
        //连接到表 site
        var collection = db.collection('activityList');
        if(req.body.mapPoint&&req.body.esInformation){
            var data = {
                "mapPoint":req.body.mapPoint,
                "esInformation":req.body.esInformation,
            };
            collection.insert(data, function(err, result) {
                if(err)
                {
                    console.log('Error:'+ err);
                    return;
                }else {
                    res.json({
                        result:result,
                        code:200,
                        type:"success",
                        message:"发布成功"
                    })
                }
                callback(result);
            });
        }else {
            res.json({
                code:400,
                type:"error",
                message:"发布失败,请检查填写信息"
            })
        }
    }
}

function queryActivity(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        add(db, function(result) {
            db.close();
        });
    });
    var add = function(db, callback) {
        //连接到表 site
        var collection = db.collection('activityList');
        var data = {
            name:req.body.name
        }
        collection.find().toArray(function (err,result) {
            if(err){
                res.json({
                    code:400,
                    type:"error",
                    message:err
                })
            }else {
                res.json({
                    code:200,
                    type:"success",
                    result:result,
                    message:"请求成功"
                })
            }
        })
    }
}

function deleteActivity(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        dele(db, function(result) {
            db.close();
        });
    });
    var dele = function(db, callback) {
        //连接到表 site
        var collection = db.collection('activityList');
        collection.remove({
            _id: new ObjectID(req.query.id)
        },function (err,result) {
            if(err){
                res.json({
                    code:400,
                    type:"error",
                    message:err
                })
            }else {
                res.json({
                    code:200,
                    type:"success",
                    result:result,
                    message:"删除成功"
                })
            }
        })
    }
}

function ActivityDesc(req,res,DB_CONN_STR,MongoClient) {
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        desc(db, function(result) {
            db.close();
        });
    });
    var desc = function(db, callback) {
        //连接到表 site
        var collection = db.collection('activityList');
        var data = {
            _id:new ObjectID(req.body.id)
        }
        collection.find(data).toArray(function (err,result) {
            if(err){
                res.json({
                    code:400,
                    type:"error",
                    message:err
                })
            }else {
                res.json({
                    code:200,
                    type:"success",
                    result:result,
                    message:"请求成功"
                })
            }
        })
    }
}


exports.deleteActivity = deleteActivity
exports.addActivity = addActivity
exports.queryActivity = queryActivity
exports.ActivityDesc = ActivityDesc