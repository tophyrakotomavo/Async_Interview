import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { sessionRouter } from "./routers/session";
import { questionRouter } from "./routers/question";
import { interviewRouter } from "./routers/interview";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  session: sessionRouter,
  questions: questionRouter,
  interview: interviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
