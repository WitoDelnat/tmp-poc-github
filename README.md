# POC Git operations

## Prerequisites

**INSTALLATION_ID.** You can create your own app or go to https://github.com/apps/monokle-demo and connect it to your account It should redirect you to a failing page, though the URL contains a query param with an installation id. Add that to your `.env`.

**CLIENT_SECRET.** Use the app dashboard if you made your own app, otherwise ask me for the secret.

**./app.private-key.pem.** Use the app dashboard if you made your own app, otherwise ask me for the private key.

## Usage

Each file is an isolated entrypoint. You can execute it as follows from the repository root:

```bash
npx ts-node src/app/git-clone.ts
```
