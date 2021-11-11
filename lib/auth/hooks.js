import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json()).then((data) => {
  return { user: data || null }
})

export function useUser() {
  const {data, error} = useSWR("/api/auth/session", fetcher)
  const user = data?.user;
  return error ? null : user
}