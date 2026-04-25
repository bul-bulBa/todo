-- CreateEnum
CREATE TYPE "AuthMethod" AS ENUM ('CREDENTIALS', 'GOOGLE', 'DISCORD');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('VERIFICATION', 'TWO_FACTOR', 'PASSWORD_RESET', 'REFRESH');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_verifiend" BOOLEAN NOT NULL DEFAULT false,
    "is_two_factor_enabled" BOOLEAN NOT NULL DEFAULT false,
    "method" "AuthMethod" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "type" "TokenType" NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChecklistItem" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "todo_id" TEXT NOT NULL,

    CONSTRAINT "ChecklistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_sub_key" ON "accounts"("provider", "sub");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChecklistItem" ADD CONSTRAINT "ChecklistItem_todo_id_fkey" FOREIGN KEY ("todo_id") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
