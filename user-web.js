const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa(); 
const router = new Router();

router.get('/user', function (ctx) {
	console.log("CTX is: ", ctx); 
	ctx.body = [];
}); 

app
  .use(router.routes())
  .use(router.allowedMethods()); 

module.exports = app; 
console.log("APP :", app); 