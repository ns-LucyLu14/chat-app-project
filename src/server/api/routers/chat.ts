import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.string().nullish(),
        messageText: z.string(),
        userId: z.string().nullish(),
      }),
    )
    .mutation(
      async ({ input: { messageText, conversationId, userId }, ctx }) => {
        if (!conversationId) {
          if (!userId) {
            throw new Error("No recipient passed");
          }

          return ctx.db.$transaction(async (trx) => {
            const conversation = await trx.conversation.create({
              data: {
                messages: {
                  create: {
                    messageText,
                    userId: ctx.session.user.id,
                  },
                },
                conversationUsers: {
                  createMany: {
                    data: [{ userId }, { userId: ctx.session.user.id }],
                  },
                },
              },
              include: {
                messages: true,
              },
            });

            await trx.conversation.update({
              data: {
                lastMessageId: conversation.messages[0]!.id,
              },
              where: {
                id: conversation.id,
              },
            });

            return conversation;
          });
        }

        await ctx.db.$transaction(async (trx) => {
          const [message] = await Promise.all([
            trx.message.create({
              data: {
                messageText,
                userId: ctx.session.user.id,
                conversationId,
              },
            }),
            trx.conversationUser.findUniqueOrThrow({
              where: {
                userId_conversationId: {
                  userId: ctx.session.user.id,
                  conversationId,
                },
              },
            }),
          ]);

          await trx.conversation.update({
            data: {
              lastMessageId: message.id,
            },
            where: {
              id: conversationId,
            },
          });
        });

        const user = await ctx.db.conversationUser.findFirst({
          where: {
            conversationId,
            NOT: {
              userId: ctx.session.user.id,
            },
          },
          select: {
            userId: true,
          },
        });
      },
    ),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
