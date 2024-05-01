import { gql } from "@apollo/client";

export const SIGNUP_USER = gql `
mutation signUp($data:UserInput!){
    signup(userNew:$data){
      token
    }
  }
`
export const INFO = gql `
query INFO($data:String!){
  basicinfo(to:$data){
    userName
    email
  }
}
`
export const LIKE_POST = gql `
mutation Like($data:String!){
  likepost(to:$data)
}
`
export const NEW_POST = gql `
mutation NewPost($data:PostInput!){
  makepost(postNew:$data){
    imgLink
    imgdesc
    likes
    comments
    p
    zone
    by
  }
}
`
export const USER_POST = gql `
query userPosts($data:String!){
    userposts(to:$data){
      _id
      imgLink
      imgdesc
      likes
      comments
      zone
      p
      by
      userName
      email
    }
  }
`
export const FRIEND_POST = gql `
query FRD_POST($data:String!){
  friendpost(to:$data){
    _id
    likes
    imgLink
    imgdesc
    comments
    zone
    p
    by
    userName
    email
  }
}
`
export const TRENDING = gql `
query TRENDING{
  gettrending{
    name
  }
}
`
export const SEARCH_USER = gql `
query SEARCH($data:String!){
  searchuser(to:$data){
    _id
    userName
    email
    password
  }
}
`
export const FREIDN_ACCEPT = gql `
mutation makeFriend($data:String!){
  addfriend(to:$data){
    p1
    p2
  }
}
`
export const NOTIFICATION = gql `
query NOTI{
  notification{
    from
    userName
  }
}
`

export const FRIEND_REQUEST = gql `
mutation FriendReq($data:String!){
	friendrequest(to:$data)
}
`
export const CHEKCK_FRIEND = gql `
query CHECKFRIEND($data:String!){
  checkfriend(to:$data)
}
`
export const POST_COMMENT = gql `
query COMMENT($data:String!){
  getcomment(to:$data){
    _id
    on
    from
    time
    name
    userName
  }
}
`

export const IMAGE = gql `
query IMG($data:String!){
  getimgLink(to:$data)
}
`

export const MAKE_COMMENT = gql `
mutation COMMENT($data:CommentInput!){
  makecomment(commentNew:$data)
}
`
export const ALLFRIEND = gql `
query AllFriends{
    allfriend{
      frd
      username
      owner
      email
      femail
    }
  }
`

export const GET_ALL_POST = gql `
query ALLPOST{
    allpost{
      _id
      imgLink
      imgdesc
      likes
      comments
      zone
      p
      by
      userName
    }
  }
`
export const ME = gql `
query ME{
  me{
    userName
    email
  }
}
`
    //shop

export const GETALLITEMS = gql `
query GETALLITEMS{
  getallitem{
    _id
    from
    price
    name
    stars
    boughtCount
    imgLink
    userName
  }
}
`
export const ADDTOCART = gql `
mutation ADDCARD($data:String!){ 
  addcard(to:$data)
}
`
export const GETALLCART = gql `
query GETINCART{
  getallcart{
    _id
    which
    name
    from
    price
    boughtCount
    imgLink
  }
}
`
export const BUY_FROM_CART = gql `
mutation BUY($data:String!){
  buy(to:$data)
  }
`
export const REMOVE_FROM_CART = gql `
mutation REMOVEFROMCART($data:String!){
  removefromcart(to:$data)
}
`
export const GET_ALL_ORDER = gql `
query GETALLORDERS{
  getallorder{
    _id
    of
    for
    name
    price
    imgLink
  }
}
`
export const GET_ALL_REVIEW = gql `
query GET_ALLREVIEW($data:String!){
  getallreview(to:$data){
    _id
    by
    on
    name
    stars
    userName
  }
}
`
export const SEND_REVIEW = gql `
mutation REVIEW($data:ReviewInput!){
  makereivew(reivewNew:$data)
}
`
export const SELL_ITEM = gql `
mutation ADDITEM($data:ItemInput!){
  makeitem(itemNew:$data){
    name
  }
}
`
export const SEARCH_ITEM = gql `
query SEARCH($data:String!){
  searchitem(to:$data){
    _id
  }
  }
`
export const MOST_BOUGHT = gql `
query TOPBOUGHT{
  getMostBought{
    name
  }
}
`
export const GET_ITEM_REIVEW = gql `
query Get_Signle_Review($data:String!){
  getItemreview(to:$data){
    imgLink
    stars
  }
}
`;