import React from 'react'
import Header from './common/nav/Header'
import Footer from './common/nav/Footer'
import useUserStore from './store/user'

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userData = useUserStore();

  return (
    <div className="App">
        <Header />
        <div>내용</div>
        <Footer />
    </div>
)
}

export default App