// Post model definitions and methods
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Post {
    static async create(data, files = null) {
        const postData = {
            title: data.title,
            content: data.content,
            authorId: data.authorId
        };

        // Only add images if files are provided
        if (files && files.length > 0) {
            postData.images = {
                create: files.map(file => ({
                    url: `/uploads/${file.filename}`
                }))
            };
        }

        console.log("les datas : ",postData);

        return prisma.post.create({
            data: postData,
            include: {
                images: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    static async findAll() {
        return prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                images: true,
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    static async findById(id) {
        return prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                images: true,
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
    }

    static async addComment(postId, authorId, content) {
        return prisma.comment.create({
            data: {
                content,
                postId: parseInt(postId),
                authorId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    }

    static async update(id, { title, content, newImages = null }) {
        const updateData = {
            title,
            content
        };

        // Only add new images if they are provided
        if (newImages && newImages.length > 0) {
            updateData.images = {
                create: newImages
            };
        }

        return prisma.post.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                images: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                email: true
                            }
                        }
                    }
                }
            }
        });
    }

    static async delete(id) {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { images: true }
        });

        if (!post) {
            throw new Error('Post not found');
        }

        return prisma.post.delete({
            where: { id: parseInt(id) }
        });
    }

    static async getImages(id) {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            select: { images: true }
        });
        return post?.images || [];
    }
}

module.exports = Post;
