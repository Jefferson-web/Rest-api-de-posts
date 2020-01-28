import { Router, Request, Response } from 'express';

class IndexRoutes {

    public router: Router = Router();

    constructor() {
        this.routes();
    }

    routes(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Api : /api/posts');
        });
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;