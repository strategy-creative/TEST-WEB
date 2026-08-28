# Why the build uses webpack, not Turbopack

`npm run build` and `npm run dev` both pass `--webpack`.

Next 16 defaults to Turbopack, which is faster. But Turbopack panics
while bundling the Keystatic admin:

```
FATAL: An unexpected Turbopack error occurred
<Code as GenerateSourceMap>::generate_source_map was canceled
```

It is reproducible, not a flake — it happened on every attempt once
`@keystatic/next` was added. The webpack builder compiles the same code
without complaint, and the output is identical for every page.

**Do not remove `--webpack` to "speed up the build"** unless you have
confirmed a Turbopack build actually completes with the admin in place.
Builds take a few seconds longer this way; a failed deploy costs more.

Worth retrying now and then — when a future Next or Keystatic release
fixes it, drop the flag and delete this file.
