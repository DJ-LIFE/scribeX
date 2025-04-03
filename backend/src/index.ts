
import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import {cors} from 'hono/cors'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

// Cors policy
app.use('*', cors());

app.get('/', (c) => {
	c.status(200);
	return c.text("scribeX Backend");
} )
app.route('/api/v1/user', userRouter);

app.route('/api/v1/blog', blogRouter);


export default app
