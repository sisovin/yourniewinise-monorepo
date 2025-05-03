import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:3001', // Nest.js API server
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // remove base path
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return apiProxy(req, res, (result: any) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}
