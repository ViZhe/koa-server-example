
import koaRouter from 'koa-router';


const router = new koaRouter();

router.all('/api', (ctx) => {
  ctx.body = {
    message: 'API method not allowed',
    status: 405,
    success: false,
  };
});


export default router;
