import { PrismaClient } from "@prisma/client";

import { data } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");
    await prisma.questionsOnCategories.deleteMany();
    await prisma.question.deleteMany();
    await prisma.category.deleteMany();

    for (const item of data) {
        await prisma.question.create({
            data: {
                text: item.text,
                categories: {
                    create: item.categories.map(categoryName => ({
                        category: {
                            connectOrCreate: {
                                where: { name: categoryName },
                                create: { name: categoryName },
                            },
                        },
                    })),
                },
            },
        });
    }
    console.log("Seeding finished.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
