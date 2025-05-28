// import { wm } from '../config'
// export default async (request) => wm.cleanupHandler(request)
export default async () => new Response('not found', { status: 404 })