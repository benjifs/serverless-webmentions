// import { wm } from '../config'
// export default async (request) => wm.webmentionBackgroundHandler(request)
export const config = { path: '/receive' }
export default async () => new Response('not found', { status: 404 })