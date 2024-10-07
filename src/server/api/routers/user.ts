import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  findOne: protectedProcedure
    .input(z.object({ username: z.string().min(1) }))
    .query(({ input, ctx }) => {
      return ctx.db.user.findFirst({
        where: { username: input.username },
      });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), username: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          name: input.name,
          username: input.username,
          email: null,
          theme: "light",
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
