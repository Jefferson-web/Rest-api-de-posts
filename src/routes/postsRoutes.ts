import { Router, Request, Response } from 'express';
import Post from '../models/Post';

class PostsRoutes {

    public router: Router = Router();

    constructor() {
        this.routes();
    }

    async getPosts(req: Request, res: Response) {
        const posts = await Post.find();
        res.json(posts);
    }

    async getPost(req: Request, res: Response) {
        const url = req.params.url;
        const post = await Post.findOne({ url });
        res.json(post);
    }

    async createPost(req: Request, res: Response) {
        const newPost = new Post({
            title: req.body.title,
            url: req.body.url,
            content: req.body.content,
            image: req.body.image
        });
        await newPost.save();
        res.json({
            data: newPost
        });
    }

    async updatePost(req: Request, res: Response) {
        const url = req.params.url;
        const post = req.body;
        const updatedPost = await Post.findOneAndUpdate({ url }, post, { new: true });
        res.json(updatedPost);
    }

    async deletePost(req: Request, res: Response) {
        const url = req.params.url;
        await Post.remove({ url });
        res.json('Post eliminated');
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }

}

const postsRoutes = new PostsRoutes();

export default postsRoutes.router;