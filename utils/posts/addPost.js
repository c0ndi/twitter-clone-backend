import Post from "../../schemas/post.schema.js";
import User from "../../schemas/user.schema.js";

export async function addPost(res, authorId, content) {
   try {
      const author = await User.findOne({_id: authorId});

      const post = new Post({
         authorId,
         author,
         content,
      })

      await post.save();

      res.status(200).json({isError: false, message: "Post created successfully"});
   } catch (err) {
      console.log(err)

      res.status(500).json({isError: true, message: "Cannot save post"});
   }
}