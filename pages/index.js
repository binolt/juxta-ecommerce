import { useAuth } from "../context/AuthContext"

export default function Home() {
  const {currentUser} = useAuth();
  return (
    <div className="app">
      <h1>Home Page</h1>
      <p>{currentUser && currentUser.username}</p>
    </div>
  )
}

