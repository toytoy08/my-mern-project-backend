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