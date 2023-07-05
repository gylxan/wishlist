import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const getWishes = async () => await prisma.wish.findMany();

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await getWishes());
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = await prisma.wish.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ id });
  } catch (e) {
    res.status(400).json({ message: getErrorMessage(e) });
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id) {
    const id = req.query.id[0];
    try {
      const updated = await prisma.wish.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(updated);
    } catch (e) {
      res.status(400).json({ message: getErrorMessage(e) });
    }
  }
  res.status(404);
}

async function remove(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id) {
    const id = req.query.id[0];
    try {
      const deleted = await prisma.wish.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json(deleted);
    } catch (e) {
      res.status(400).json({ message: getErrorMessage(e) });
    }
  }
  res.status(404);
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    case 'DELETE':
      return remove(req, res);
    case 'POST':
      return post(req, res);
    case 'PUT':
      return put(req, res);
  }
}
