
import Koa from 'koa';
import KoaRouter from 'koa-router';


const router = new KoaRouter();

router.all('/api', (ctx: Koa.Context) => {
  ctx.body = {
    message: 'API method not allowed',
    status: 405,
    success: false,
  };
});


export default router;
