const mog = require('mongoose')
mog.connect('mongodb://127.0.0.1:27017/playground', {useNewUrlParser: true})
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.log(err, '数据库连接失败'))

