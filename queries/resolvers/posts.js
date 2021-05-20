const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../mock-up/Post");
const checkAuth = require("../../helpers/check-auth");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found Please enter the correct postID");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (!post) return new Error("Post does not exist");
        if (post.user != user.id) return new Error("you are not allowed");
        await post.delete();
        return "Post deleted successfully";
      } catch (err) {
        throw new Error(err);
      }
    },
    async updatePost(_, { postId, body }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (!post) return new Error("Post does not exist");
        if (post.user != user.id) return new Error("you are not allowed ");
        post.body = body;
        await post.save();
        return post;
      } catch (err) {
        throw new Error(err);
      }
      return post;
    },
    async sharePost(_, { postId, userId }, context) {
      const connectUser = checkAuth(context);
      try {
        const post = await post.findById(postId);
        if (!post) return new Error("Post does not exist");
        const user = await User.findById(userId);
        if (!user) return new Error("User does not exist");
        if (post.user != connectUser.id)
          return new Error("you are not allowed ");
        if (userId == connectUser.id)
          return new Error("You are already the owner");
        post.sharedWith.push(userId);
        user.sharedPosts.push(postId);
        await post.save();
        await user.save();
        return post;
      } catch (err) {
        throw new Error(err);
      }
      return post;
    },
    async donePost(_, { postId }, context) {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (!post) return new Error("Post does not exist");
      if (post.user != user.id) return new Error("you are not allowed ");
      post.done = !post.done;
      await post.save();
      return post;
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
