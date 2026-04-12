import { redirect } from 'next/navigation'

export default async function UsernameIndexPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  redirect(`/${username}/home`)
}
