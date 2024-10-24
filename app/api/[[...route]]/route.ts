import { Hono } from 'hono'
import { handle } from 'hono/vercel'
// import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
// import { json } from 'stream/consumers'
import blogs from "./blogs"

export const runtime = "edge";


const app = new Hono().basePath('/api')

const routes = app
  .route('/blogs', blogs)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;