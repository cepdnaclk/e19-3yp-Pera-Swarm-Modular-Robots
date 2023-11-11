# Local Development

Since this branch is independent from other branches, clear any unnecessary files/folders that may remain when switching from another branch.

First reset repo to state of last commit:

```
$ git reset --hard
```

Next remove any files or folders that are unnecessary. (Do a dry run first and make sure nothing important is getting deleted):
```
$ git clean -d --dry-run
$ git clean -d
```

Start local development server:

```
$ pnpm install
$ pnpm run dev
```
