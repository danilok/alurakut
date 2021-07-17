import { SiteClient } from 'datocms-client';

const token = process.env.NEXT_PUBLIC_API_KEY;
const client = new SiteClient(token);

const methods = {
  POST: async (request, response) => {
    const record = await client.items.create({
      itemType: process.env.NEXT_PUBLIC_SCRAP_MODEL_ID,
      ...request.body
    });
    return response.status(200).send(record)
  },
  GET: async (request, response) => {
    const records = await client.items.all({
      filter: {
        type: "scrap",
      }
    });
    const serialized = records.map((record) => {
      return {
        id: record.id,
        scrap: record.scrap,
        creatorSlug: record.creatorSlug,
        createdAt: record.createdAt
      }
    })
    return response.status(200).send(serialized)
  },
  PUT: async (request, response) => {
    return response.status(403).send()
  },
  DELETE: async (request, response) => {
    return response.status(403).send()
  }
}

export default async function recados(request, response) {

  const method = request.method;
  const exec = methods[method];

  if (!exec) {
    return response.status(405).send();
  }

  return exec(request, response);
}