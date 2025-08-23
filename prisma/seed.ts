import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 既存データを外部キー制約順で削除
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  // ユーザー・ポスト・コメントをループで登録
  for (let ux = 0; ux < 3; ux++) {
    const userId = `default-user${ux}-id`;
    await prisma.user.create({
      data: {
        id: userId,
        email: `default-user${ux}@example.com`,
        password: `pass${ux}`,
      },
    });

    for (let px = 0; px < 3; px++) {
      const postId = `default-post${ux}-${px}-id`;
      await prisma.post.create({
        data: {
          id: postId,
          userId: userId,
          content: `default-post${ux}-${px}`,
        },
      });

      for (let cx = 0; cx <= 2; cx++) {
        await prisma.comment.create({
          data: {
            postId: postId,
            content: `default-comment${ux}-${px}-${cx}`,
          },
        });
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
