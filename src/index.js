const Koa =  require("koa");
const app = new Koa();
const cors = require('@koa/cors');


const db = require("./models");
const {PORT} = require("./config");

// 加载路由
const loadRouter = require("./router");


app.use(async (ctx)=>{
    ctx.body = "hello world";
});

// 跨域配置
app.use(cors({
    origin:["https://blog.onechuan.cn",'http://localhost:3000','http://localhost:8080'],
    credentials: true
}));

// 全局拦截验证token配置
app.use(async (ctx)=>{
    const { baseUrl } = ctx.body.req;
    const resp = ctx.body.resp;
    /* 白名单过滤,登陆注册 访问静态资源等 操作不需要传递token */
    if (WHITE_LIST.includes(baseUrl) || baseUrl.startsWith('/source')) {
        return next();
    }
    if (baseUrl.startsWith("/reception") || baseUrl.startsWith("/api/reception")) {
        increaseVisited(); // 前端访问量自增
        // 匹配到前台路由
        return next();
    }
    /**
     * 1. 拿到前端请求头中的(token)与(用户名)进行有效检验
     * 2. 校验通过的话放行 不通过的话拦截
     */
    const { token, username } = req.headers;
    if (token == null || username == null) {
        return resp.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // 未携带token
    }
    try {
        await tokenVerify(token, username); // 验证通过
        next(); // 没有出错就是验证成功的情况
    } catch (e) {
        return e.msg === 'TokenExpiredError' ?
            resp.json({ code: -888, msg: Tip.TOKEN_IS_EXPIRESE }) : // token过期的情况
            resp.json({ code: -999, msg: Tip.TOKEN_IS_UNDEFINED }); // token错误的情况
    }
})

loadRouter(app);

app.listen(PORT,()=>{
    db.sequelize
    .sync({ force: false }) // If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
    .then(async () => {
      console.log('sequelize connect success')
      console.log(`this server is running... http://localhost:${PORT}`);
    })
    .catch(err => {
      console.log(err)
    })
});  

