import { SiteClient } from 'datocms-client';

const token = process.env.NEXT_PUBLIC_API_KEY;
const client = new SiteClient(token);

const methods = {
  POST: async (request, response) => {
    const record = await client.items.create({
      itemType: process.env.NEXT_PUBLIC_GITHUB_USER_MODEL_ID,
      ...request.body
    });
    return response.status(200).send(record)
  },
  GET: async (request, response) => {
    const { login } = request.query;
    const query = {
      filter: {
        type: "githubuser"
      }
    }
    if (login) {
      query.filter.fields = {
        login: {
          eq: login
        }
      }
    }
    const records = await client.items.all(query);
    if (records.length === 0) {
      return response.status(404).send();
    }
    const serialized = records.map((record) => {
      return {
        id: record.id,
        login: record.login,
        name: record.name,
        created_at: record.creationDate,
        public_repos: record.publicRepos,
        followers: record.followers,
        following: record.following,
        location: record.location
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