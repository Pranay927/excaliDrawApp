# excaliDrawApp
 
# Two Backend Servers - 
            HTTP
            WebSocket

# So created two folders  http-backend & ws-backend 
        npm init -y
         

# Manually created a "tsconfig.json" for both folders and extended the base.json from 
 the path -> "packages\typescript-config\base"

# Basic compiler Options - rootDir, outDir in tsconfig.json

# Added  "@repo/typescript-config": "workspace:*" as devDependency if you want to import librabry from same workspace "locally"

# did a global pnpm install

# Ctrl + P for quick search in vscode

$ pnpm install prisma
$ npx prisma init


# Schema Prisma

# User Model
    Represents a user with id, username, password, and photo.
    A user can be in multiple rooms and send multiple chats.

# Room Model
    Represents a chat room with id, slug, createdAt, and an admin.
    A room has multiple chats and is managed by one admin.

# Chat Model
    Represents a message with id, message, userId, and roomId.
    Each chat is sent by a user in a specific room.

Relationships:

    User ↔ Room: A user can join multiple rooms.
    User ↔ Chat: A user can send multiple messages.
    Room ↔ Chat: A room contains multiple messages.

# npx prisma migrate dev --name init_schema (after replacing url from neon db for postgres)
# npx prisma generate
# Import db packages in http layer




