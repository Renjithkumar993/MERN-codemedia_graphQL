const { User, Snippet, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    saveSnippet: async (parent, { title, code, description, language }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedSnippets: { title, code, description, language, createdBy: context.user._id } } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Not logged in');
    },
    removeSnippet: async (parent, { snippetID }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to perform this action.');
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedSnippets: { _id: snippetID } } },
        { new: true }
      );
      return updatedUser;
    },
    editSnippet: async (parent, { snippetID, code }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to perform this action.');
      }
    
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id, "savedSnippets._id": snippetID },
        { $set: { "savedSnippets.$.code": code } }, 
        { new: true }
      );
    
      return updatedUser;
    }
    
   
  },
};

module.exports = resolvers;
