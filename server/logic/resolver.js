import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { SECRETE } from '../config.js'

const User = mongoose.model("User")
    //socail
const Comment = mongoose.model("Comment")
const Post = mongoose.model("Post")
const Friend = mongoose.model("Friend")
const Friendrequest = mongoose.model("Friendrequest")
const Trending = mongoose.model("Trending")
    //shop
const Item = mongoose.model("Item")
const Review = mongoose.model("Review")
const Order = mongoose.model("Order")
const Cart = mongoose.model("Cart")

const resolvers = {
    Query: {
        me: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const user = await User.findById(userId);
            return user;
        },
        //social
        checkallrequest: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const uncheckedRequests = await Friendrequest.find({ to: userId });
                const requestsWithUsername = await Promise.all(uncheckedRequests.map(async request => {
                    const sender = await User.findById(request.from);
                    const username = sender ? sender.userName : null;
                    return { from: request.from, username };
                }));
                return requestsWithUsername;
            } catch (error) {
                console.error("Error fetching unchecked friend requests:", error);
                throw new Error("Failed to fetch unchecked friend requests.");
            }
        },
        basicinfo: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const user = await User.findById(to);
            return user;
        },
        userposts: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const allPosts = await Post.find({ p: false, by: to });
            const postsWithUserName = await Promise.all(allPosts.map(async(post) => {
                const user = await User.findById(post.by);
                return {
                    ...post.toObject(), // Convert Mongoose document to plain JavaScript object
                    userName: user.userName,
                    email: user.email // Add userName to the post object
                };
            }));
            return postsWithUserName;
        },
        checkfriend: async(_, { to }, { userId }) => {
            if (!userId) {
                throw new Error("You are not logged in!");
            }
            if (to == userId) {
                return true;
            }
            try {
                const friendship = await Friend.findOne({
                    $or: [
                        { $and: [{ p1: userId }, { p2: to }] },
                        { $and: [{ p1: to }, { p2: userId }] }
                    ]
                });
                return friendship !== null;
            } catch (error) {
                console.error("Error checking friendship:", error);
                throw new Error("Failed to check friendship.");
            }

        },
        notification: async(_, argd, { userId }) => {
            if (!userId) {
                throw new Error("You are not logged in!");
            }
            try {
                const notifications = await Friendrequest.find({ to: userId });
                const populatedNotifications = await Promise.all(notifications.map(async(notification) => {
                    const fromUser = await User.findById(notification.from);
                    return {
                        from: notification.from,
                        userName: fromUser.userName
                    };
                }));
                return populatedNotifications;
            } catch (error) {
                console.error("Error fetching notifications:", error);
                throw new Error("Failed to fetch notifications.");
            }
        },
        allpost: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const allPosts = await Post.find({ p: false });
            const postsWithUserName = await Promise.all(allPosts.map(async(post) => {
                const user = await User.findById(post.by);
                return {
                    ...post.toObject(), // Convert Mongoose document to plain JavaScript object
                    userName: user.userName // Add userName to the post object
                };
            }));
            return postsWithUserName;
        },
        friendpost: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const allPosts = await Post.find({ by: to });
            const postsWithUserName = await Promise.all(allPosts.map(async(post) => {
                const user = await User.findById(post.by);
                return {
                    ...post.toObject(), // Convert Mongoose document to plain JavaScript object
                    userName: user.userName,
                    email: user.email // Add userName to the post object
                };
            }));
            return postsWithUserName;
        },
        userpost: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const allpost = await Post.find({ by: to, p: false });
            return allpost;
        },
        getimgLink: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const post = await Post.findById(to);
            return post.imgLink;
        },
        allfriend: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const UR = await User.findById(userId);
            const UN = UR.userName;
            const UE = UR.email;
            try {
                const friends = await Friend.find({ $or: [{ p1: userId }, { p2: userId }] });
                const friendDetails = [];
                for (const friend of friends) {
                    const friendsId = friend.p1.equals(userId) ? friend.p2 : friend.p1;
                    const user = await User.findById(friendsId);
                    if (user) {
                        friendDetails.push({ frd: friendsId, username: user.userName, femail: user.email, owner: UN, email: UE });
                    }
                }
                return friendDetails;
            } catch (error) {
                console.error("Error fetching friends:", error);
                throw new Error("Failed to fetch friends.");
            }
        },
        gettrending: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const trendingTopics = await Trending.find()
                    .sort({ count: -1 })
                    .limit(4);
                return trendingTopics;
            } catch (error) {
                throw new Error('Error fetching trending topics');
            }
        },
        searchuser: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            try {
                const users = await User.findOne({ userName: { $regex: new RegExp(to, 'i') } }, '_id userName email password');

                return users;
            } catch (error) {
                console.error("Error searching users:", error);
                throw new Error("Failed to search users.");
            }
        },
        getcomment: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const comments = await Comment.find({ on: to });
                const commentsWithUserNames = await Promise.all(comments.map(async(comment) => {
                    const user = await User.findById(comment.from);
                    return {
                        _id: comment._id,
                        on: comment.on,
                        time: comment.time,
                        from: comment.from,
                        name: comment.name,
                        userName: user.userName
                    };
                }));
                return commentsWithUserNames;
            } catch (error) {
                console.error("Error fetching comments:", error);
                throw new Error("Failed to fetch comments.");
            }
        },
        //shop 
        getallitem: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const itemsWithName = await Item.find({}).populate('from', 'userName');
            const formattedItems = itemsWithName.map(item => ({
                _id: item._id,
                from: item.from._id,
                price: item.price,
                desc: item.desc,
                name: item.name,
                stars: item.stars,
                boughtCount: item.boughtCount,
                imgLink: item.imgLink,
                userName: item.from.userName
            }));

            return formattedItems;
        },
        getallcart: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");

            const cartItems = await Cart.find({ of: userId });
            const populatedCartItems = await Promise.all(cartItems.map(async(cartItem) => {
                const itemDetails = await Item.findById(cartItem.which);
                return {
                    _id: cartItem._id,
                    which: itemDetails._id,
                    from: itemDetails.from,
                    price: itemDetails.price,
                    desc: itemDetails.desc,
                    name: itemDetails.name,
                    stars: itemDetails.stars,
                    boughtCount: itemDetails.boughtCount,
                    imgLink: itemDetails.imgLink
                };
            }));

            return populatedCartItems;
        },
        getallorder: async(_, argd, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const orders = await Order.find({ of: userId });
            const populatedOrders = await Promise.all(orders.map(async(order) => {
                const itemDetails = await Item.findById(order.for);
                return {
                    _id: order._id,
                    of: order.of,
                    for: order.for,
                    name: itemDetails.name,
                    price: itemDetails.price,
                    imgLink: itemDetails.imgLink
                };
            }));

            return populatedOrders;
        },
        getallreview: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const reviews = await Review.find({ on: to });
            const populatedReviews = await Promise.all(reviews.map(async(review) => {
                const user = await User.findById(review.by);
                if (!user) {
                    throw new Error("User not found");
                }

                return {
                    _id: review._id,
                    by: review.by,
                    on: review.on,
                    name: review.name,
                    stars: review.stars,
                    userName: user.userName // Assuming the user name is stored in the 'name' field of the user document
                };
            }));

            return populatedReviews;
        },
        getItemreview: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const item = await Item.findById(to);
            return {
                imgLink: item.imgLink,
                stars: item.stars
            };
        },
        getMostBought: async(_, argd, { userID }) => {
            const mostBoughtItems = await Item.find().sort({ boughtCount: -1 }).limit(4);
            return mostBoughtItems.map(item => ({
                name: item.name,
                // Add any other properties you want to return
            }));
        },
        searchitem: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            try {
                const item = await Item.findOne({ name: { $regex: new RegExp(to, 'i') } }, '_id userName email password');
                return item;
            } catch (error) {
                console.error("Error searching users:", error);
                throw new Error("Failed to search users.");
            }
        }




    },
    Mutation: {
        signup: async(_, { userNew }) => {
            const { email, password } = userNew;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                if (existingUser.password !== password) {
                    throw new Error("Email or password is incorrect");
                }
                const token = jwt.sign({ userId: existingUser._id }, SECRETE);
                return { token };
            } else {
                const newUser = new User({...userNew });
                await newUser.save();
                const token = jwt.sign({ userId: newUser._id }, SECRETE);
                return { token };
            }
        },
        //socail
        makepost: async(_, { postNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { imgLink, imgdesc, zone, p } = postNew;
            const newPost = new Post({ imgLink, imgdesc, zone, p, by: userId });
            await newPost.save();
            const trendingTopic = await Trending.findOne({ name: zone });
            if (trendingTopic) {
                trendingTopic.count += 1;
                await trendingTopic.save();
            } else {
                await Trending.create({ name: zone });
            }
            return newPost;
        },

        makecomment: async(_, { commentNew }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const { on, name } = commentNew;
            const newComment = new Comment({
                on,
                from: userId,
                name,
                time: new Date()
            })

            await newComment.save();
            await Post.findByIdAndUpdate(on, { $inc: { comments: 1 } });
            return "You have commented!"
        },
        friendrequest: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const newFriendRequest = new Friendrequest({
                from: userId,
                to
            })
            await newFriendRequest.save()
            return "request send!"
        },
        addfriend: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            const newFriend = new Friend({
                p1: userId,
                p2: to
            })
            await newFriend.save();

            await Friendrequest.deleteOne({ from: to, to: userId })
            return newFriend;
        },
        likepost: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logedin !")
            await Post.findByIdAndUpdate(to, { $inc: { likes: 1 } });
            return "you have likes the post!"
        },
        //shop
        makeitem: async(_, { itemNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { name, price, desc, imgLink } = itemNew;
            const newItem = new Item({ imgLink, price, desc, name, from: userId });
            await newItem.save();
            return newItem;
        },
        addcard: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const addCart = new Cart({ which: to, of: userId })
            await addCart.save()
            return "Added to card!"
        },
        buy: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const newbuy = new Order({ for: to, of: userId })
            await newbuy.save()
            await Item.findByIdAndUpdate(to, { $inc: { boughtCount: 1 } });
            await Cart.findOneAndDelete({ which: to });
            return "You have bought it!"
        },
        makereivew: async(_, { reivewNew }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            const { on, name, stars } = reivewNew;
            const exist = await Review.findOne({ by: userId, on });
            if (exist) { return "You have already reviewed"; }
            const item = await Item.findById(on);
            if (!item) { throw new Error("Item not found"); }

            const currentTotalStars = item.stars * item.reviewCount;
            const newTotalStars = currentTotalStars + stars;
            const newReviewCount = item.reviewCount + 1;
            const newStars = newTotalStars / newReviewCount;
            await Item.findByIdAndUpdate(on, {
                stars: newStars,
                reviewCount: newReviewCount
            });
            const newReview = new Review({ on, by: userId, name, stars });
            await newReview.save();

            return "Your review is saved!";
        },
        removefromcart: async(_, { to }, { userId }) => {
            if (!userId) throw new Error("You are not logged in!");
            await Cart.findOneAndDelete({ which: to });
            return "REMOVED";
        }
    }
}

export default resolvers