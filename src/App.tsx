import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { FunctionComponent, useContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'

// Pages
import HomePage from './page/home/home.page'
import LoginPage from './page/login/login.page'
import SignUpPage from './page/sign-up/sign-up.page'

const App: FunctionComponent = () => {
  const [isInitialize, setInitialize] = useState(true)

  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)

  onAuthStateChanged(auth, async (user) => {
    const isSigninOut = isAuthenticated && !user
    if (isSigninOut) {
      logoutUser()
      return setInitialize(false)
    }
    const isSignIn = !isAuthenticated && user
    if (isSignIn) {
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('id', '==', user.uid))
      )
      const userFromFirestore = querySnapshot.docs[0]?.data()
      loginUser(userFromFirestore as any)
      return setInitialize(false)
    }
    setInitialize(false)
  })

  if (isInitialize) return null

  console.log(isAuthenticated)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
