//model
const PostModel = require('../model/Post')

const post ={}

post.all = async (req, res) => {
    let post = await PostModel.find()
    return res.status(200).json({ data: post});
}

post.get = async (req, res) => {
    let post_id = req.params.post_id
    let post = await PostModel.findById(post_id)
    return res.status(200).json({ data: post});
}

post.insert = async (req, res) => {
    let post = new PostModel({
        user : req.user,
        title : req.body.title,
        description : req.body.description,
        created_at : Date.now()
    })
    await post.save();
    return res.status(200).json({ message: "post added successfully"});
}

post.update = async (req, res) => {
    let post_id = req.params.post_id
    let post = await PostModel.findOneAndUpdate({_id:post_id}, {title:req.body.title, description:req.body.description})
    post.save();
    return res.status(200).json({ message: "post updated successfully"});
    
}
post.delete = async (req, res) => {
    let post_id = req.params.post_id
    await PostModel.deleteOne({ _id: post_id });
    return res.status(200).json({ message: "post deleted successfully"});

}
module.exports = post
