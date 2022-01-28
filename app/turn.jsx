import { db } from '~/utils/db.server'

export async function createTurn (user) {
    debugger
  await db.turn.create({
    data: {
      userId: user.id
    }
  })
}
