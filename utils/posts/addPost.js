import Post from "../../schemas/post.schema.js";

export async function addPost(res, author, title, content) {
   const post = new Post({
      author,
      title,
      content,
   })

   try {
      await post.save();

      res.status(200).json({isError: false, message: "Post created successfully"});
   } catch (err) {
      console.log(err)
      res.status(500).json({isError: true, message: "Cannot add post"});
   }
}