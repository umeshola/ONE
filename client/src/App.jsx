import Navbar from "./Components/Navbar"
import Home from "./Components/Socail/home"
import Landing from "./Components/Ladning"
import Comments from "./Components/Socail/Comments"
import Allfriends from "./Components/Socail/Allfriends"
import Signup from "./Components/Signup"
import FriendUser from './Components/Socail/FriendUser'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import SignleUser from "./Components/Socail/SingleUser"
import Post from "./Components/Socail/Post"
import Home2 from './Components/Shop/Home'
import SigleItem from "./Components/Shop/SigleItem"
import Cart from "./Components/Shop/Cart"
import Order from "./Components/Shop/Order"
import Reivew from "./Components/Shop/Reivew"
import Add from './Components/Shop/Add'


import Home3 from "./Components/Health/Home"

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || ""
  },
});

function App() {
  return (
    <div >
      <Router>
        <div>
          <ApolloProvider client={client}>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/social" element={<Home />} />
              <Route path="/social/allfriends" element={<Allfriends />} />
              <Route path="/social/profile/:id" element={<SignleUser />} />
              <Route path="/social/profile/f/:id" element={<FriendUser />} />
              <Route path="/social/post" element={< Post />} />
              <Route path="/social/post/comment/:id" element={<Comments />} />

              <Route path="/shop" element={<Home2 />} />
              <Route path="/shop/singleitem/:id" element={<SigleItem />} />
              <Route path="/shop/cart" element={<Cart />} />
              <Route path="/shop/order" element={<Order />} />
              <Route path="/shop/review/:id" element={<Reivew />} />
              <Route path="/shop/add" element={<Add />} />

              <Route path="/health" element={<Home3 />} />
              
            </Routes>
          </ApolloProvider>
        </div>
      </Router>
    </div>
  )

}

export default App
