import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (reg, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log(postMessage);
        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (reg, res) => {
    const post = reg.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePost = async (reg, res) => {
    const { id } = reg.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id to delete');

    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE SUCCESSFULLY!!');

    res.json({ message: 'Post deleted successfully' });
}

export const updatePost = async (reg, res) => {
    const { id: _id } = reg.params;
    const post = reg.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id to update');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatePost);
}