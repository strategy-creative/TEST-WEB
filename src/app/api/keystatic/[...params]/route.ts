/**
 * Keystatic's own API route. It handles reading and writing the
 * content files, and — once GitHub storage is switched on — the
 * GitHub sign-in and the commits.
 *
 * Nothing to configure here; the schema lives in keystatic.config.ts.
 */
import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

export const { POST, GET } = makeRouteHandler({ config });
