import { useLoaderData } from 'remix'
import { db } from '~/utils/db.server'

export const loader = async () => {
  const data = await db.user.findMany({
    select: {
      id: true,
      name: true,
      turn: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1
      }
    },
  })

  return data
}


const sortNames = (userA, userB) => {
  const turnA = userA.turn[0] || {id: 0}
  const turnB = userB.turn[0] || {id: 0}
  return turnA.id - turnB.id
}

export default function Index () {
  const users = useLoaderData()
  const sortedUsers = [...users]
  sortedUsers.sort(sortNames)

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to the CRousel</h1>
      <ul>
        {sortedUsers.map((user, index) => {
          return (
            <li key={index}>
              {user.name}{' '}
              <form method="post" action="turn/new"><input type="hidden" name="userId" value={user.id} /><button type="submit">Done</button></form>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
