import { gql } from "apollo-server"

const typeDefs = gql `

 type Query{
    basicinfo(to:String!):User
    checkallrequest:[Unchecked]
    allpost:[Post]
    userpost(to:String!):[Post]
    allfriend:[Friend]
    me:User
    checkfriend(to:String):Boolean
    userposts(to:String!):[UserPost]
    friendpost(to:String!):[UserPost]
    getcomment(to:String!):[Comment]
    getimgLink(to:String!):String
    notification:[Noti]
    gettrending:[Trend]
    searchuser(to:String!):User


    getallitem:[Itemwithname]
    getallcart:[ItemCart]
    getallorder:[ItemOrder]
    getallreview(to:String!):[ItemReview]
    getItemreview(to:String!):SingleItemReview
    getMostBought:[MostBought]
    searchitem(to:String!):Item
 }
 type MostBought{
   name:String
 }
 type SingleItemReview{
   imgLink:String
   stars:Float
 }
 type ItemReview{
   _id:ID
   by:ID
   on:ID
   name:String
   stars:Int
   userName:String
 }
 type ItemOrder{
   _id:ID
   of:ID
   for:ID
   name:String
   price:Int
   imgLink:String
 }
type ItemCart{
   _id:ID
   which:ID
   from:ID
   price:Int
   desc:String
   name:String
   stars:Int
   boughtCount:Int
   imgLink:String
} 
type Itemwithname{
   _id:ID
   from:ID
   price:Int
   desc:String
   name:String
   stars:Float
   boughtCount:Int
   imgLink:String
   userName:String
}
 type Trend{
   name:String
 }
 type Noti{
   from:ID!
   userName:String
 }
 type Comment{
   _id:ID!
   on:ID!
   from:ID!
   time:String
   imgLink:String
   name:String
   userName:String
}
 type Friend{
    frd:ID!
    username:String!
    femail:String!
    owner:String!
    email:String!
 }
 type Unchecked{
    from:ID!
    username:String!
 }
 type UserPost{
   _id:ID
   imgLink:String
   imgdesc:String
   likes:Int
   comments:Int
   zone:String
   p:Boolean
   by:ID
   userName:String
   email:String
}
 type Post{
    _id:ID
    imgLink:String
    imgdesc:String
    likes:Int
    comments:Int
    zone:String
    p:Boolean
    by:ID
    userName:String
 }
 type User{
    _id:ID!
    userName:String!
    email:String!
    password:String!
 }
 type Todo{
    _id:ID!
    name:String!
    done:Boolean!
    by:ID!
 }
 type Item{
   _id:ID
   from:ID
   price:String
   name:String
   desc:String
   stars:Int
   boughtCount:Int
   imgLink:String
 }
type Mutation{
    signup(userNew:UserInput!):Token

    makepost(postNew:PostInput!):Post
    makecomment(commentNew:CommentInput!):String
    friendrequest(to: String!): String
    addfriend(to:String!):Friend
    likepost(to:String!):String

    makeitem(itemNew:ItemInput!):Item
    addcard(to:String!):String
    buy(to:String!):String
    makereivew(reivewNew:ReviewInput!):String
    removefromcart(to:String):String
}
input ReviewInput{
   on:String!
   name:String!
   stars:Int!
}
input ItemInput{
   price:Int!
   imgLink:String!
   desc:String!
   name:String!
}
type Friend{
    p1:ID!
    p2:ID!
}
input CommentInput{
    on:ID!
    name:String!
}
input PostInput{
    imgLink:String!
    imgdesc:String!
    zone:String!
    p:Boolean!
}
type Token{
    token:String!
}
input UserInput{
   userName:String!
   email:String!
   password:String!
}

`
export default typeDefs