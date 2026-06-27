import WebmentionReceiver from 'webmention-receiver'
import BlobStorage from 'webmention-handler-netlify-blobs'

const { URLS = '', NETLIFY_SITEID, NETLIFY_TOKEN, GENERATED_TOKEN, WEBHOOK } = process.env
const urls = URLS.split(',').map(u => u.trim()).filter(Boolean)
export const wm = new WebmentionReceiver({
	urls,
	store: new BlobStorage({ siteID: NETLIFY_SITEID, token: NETLIFY_TOKEN }),
	token: GENERATED_TOKEN,
	webhook: WEBHOOK,
})
