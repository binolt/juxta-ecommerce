import { useAuth } from "../context/AuthContext"

export default function Home() {
  const {currentUser} = useAuth();
  return (
    <div className="app">
      <p>{currentUser && currentUser.username}</p>
    </div>
  )
}

