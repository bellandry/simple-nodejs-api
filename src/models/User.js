// User model definitions and methods
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
  static async create(data) {
    return prisma.user.create({
      data,
      include: {
        posts: true,
      },
    });
  }

  static async findAll() {
    return prisma.user.findMany({
      include: {
        posts: true,
      },
    });
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        posts: true,
      },
    });
  }

  static async update(id, data) {
    return prisma.user.update({
      where: { id: parseInt(id) },
      data,
      include: {
        posts: true,
      },
    });
  }

  static async delete(id) {
    return prisma.user.delete({
      where: { id: parseInt(id) },
    });
  }
}

module.exports = User;
