/**
 * The admin UI itself. Everything it shows is defined in
 * keystatic.config.ts at the root of the project.
 */
"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../../../keystatic.config";

export default makePage(config);
