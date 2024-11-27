// Post model definitions and methods
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Post {
  static async create(data) {
    return prisma.post.create({
      data,
      include: {
        author: true,
      },
    });
  }

  static async findAll() {
    return prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  static async findById(id) {
    return prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
      },
    });
  }

  static async update(id, data) {
    return prisma.post.update({
      where: { id: parseInt(id) },
      data,
      include: {
        author: true,
      },
    });
  }

  static async delete(id) {
    return prisma.post.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = Post;
