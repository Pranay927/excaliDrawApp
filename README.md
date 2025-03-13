# Excalidraw Backend Setup

## Overview
This project consists of two backend servers:
- **HTTP Server** (Handles API requests)
- **WebSocket Server** (Handles real-time communication)

Both servers are organized into separate folders:
- `http-backend`
- `ws-backend`

## Project Setup

### Initialize the Workspaces
Run the following commands inside both `http-backend` and `ws-backend`:

```sh
npm init -y
```

### TypeScript Configuration
Manually create a `tsconfig.json` file in both backend folders and extend the base TypeScript configuration from:

```
packages/typescript-config/base
```

#### Basic Compiler Options in `tsconfig.json`
```json
{
  "extends": "@repo/typescript-config/base",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  }
}
```

### Install Dependencies
Run a global installation for dependencies using **pnpm**:

```sh
pnpm install -g
```

Add the shared TypeScript config as a dev dependency:

```sh
pnpm add -D @repo/typescript-config workspace:*
```

## Quick Search in VSCode
Use `Ctrl + P` for quick file navigation.

---

## Prisma Setup

### Install Prisma
Run the following command to install Prisma:

```sh
pnpm install prisma
```

Initialize Prisma in the project:

```sh
npx prisma init
```

### Define Prisma Schema

#### User Model
Represents a user with `id`, `username`, `password`, and `photo`. A user can be in multiple rooms and send multiple chats.

#### Room Model
Represents a chat room with `id`, `slug`, `createdAt`, and an `admin`. A room has multiple chats and is managed by one admin.

#### Chat Model
Represents a message with `id`, `message`, `userId`, and `roomId`. Each chat is sent by a user in a specific room.

### Relationships

- **User ↔ Room:** A user can join multiple rooms.
- **User ↔ Chat:** A user can send multiple messages.
- **Room ↔ Chat:** A room contains multiple messages.

### Database Migration
Update the database schema after setting the `DATABASE_URL` in the `.env` file:

```sh
npx prisma migrate dev --name init_schema
```

Generate Prisma client:

```sh
npx prisma generate
```

### Import Prisma Client in HTTP Layer
Ensure the Prisma client is imported in the `http-backend` to interact with the database.

```ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
```

---

This setup ensures both backends are configured properly with TypeScript and Prisma for scalable development.

