
export type Todo = {
    id: string,
    text: string,
    complete: Boolean,
    deadline?: Date,
    createdAt: Date,
    updatedAt: Date,
    userId: string
}
// model Todo {
//   id String @id @default(uuid())

//   text String

//   createdAt DateTime @default(now()) @map("created_at")
//   updatedAt DateTime @updatedAt() @map("updated_at")

//   user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
//   userId String @map("userId")

//   @@map("todos")
// }