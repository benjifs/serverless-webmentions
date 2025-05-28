# serverless-webmentions

This is an example for setting up a webmention serverless endpoint.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/benjifs/serverless-webmentions)

Clicking the "Deploy to Netlify" button will fork this repository and create a new
[Netlify](https://www.netlify.com/) site which, after configuration, will be ready
to start receiving webmentions for your site.

## Setup

The only **environment variable** that is required is `URLS`.

| Environment Variable | Description | Required |
| --- | --- | --- |
| `URLS` | A comma separated list of domains you accept webmentions to | ✅ |
| `GENERATED_TOKEN` | Use https://generate-random.org/string-generator. Some routes require this token. | |
| `NETLIFY_SITEID` | Configured automatically by default | |
| `NETLIFY_TOKEN` | Configured automatically by default | |
| `WEBHOOK` | URL to send `POST` requests to after you receive a webmention. See [ntfy.sh](https://ntfy.sh). |

## Usage

### **POST** `/webmention`
Main webmention receiver. Adds webmention to *queue* to be processed at a later
time.

```sh
curl -X POST 'https://wm.example.com/webmention' -d source=https://example.net -d target=https://example.com
```

### **GET** `/webmentions`
Returns currently saved webmentions. There are two options:

- `/webmentions?token=<token>` to return a list of all webmentions received for
all targets where `token` should match `GENERATED_TOKEN`.
- `/webmentions?url=<url>` to return a list of webmentions for `url`.

Sample response:
```json
{
  "https://example.com/target": [
    {
      "source": "https://source",
      "target": "https://example.com/target",
      "parsed": "2025-05-27T00:00:00.000Z",
      "type": "like",
      "author": {
        "type": "h-card",
        "value": "",
        "url": "https://source2",
        "photo": "",
      }
    }
  ],
	"https://example.com/target2": [
    {
      "source": "https://source2",
      "target": "https://example.com/target2",
      "parsed": "2025-05-27T00:00:00.000Z",
      "type": "mention",
      "author": {
        "type": "h-card",
        "value": "",
        "url": "https://source2",
        "photo": "",
      }
    }
  ]
}
```

### **GET** `/import?token&webmentionio`
To import all webmentions from webmention.io to your endpoint. **Requires** `token`
(should match `GENERATED_TOKEN`) and `webmentionio` which should be your
webmention.io token.

### **GET** `/process`
This route processes your currently queued webmentions which, if valid, will add
them to the corresponding target. In it's current configuration it is called internally
by Netlify once a day and it is not accessible publicly. This behaviour can change
by editing [netlify.toml](./netlify.toml).

### **GET** `/cleanup?token`
**Only use while testing.** This request will clear all webmentions and items from
the queue. Do not enable this if it's not needed.
