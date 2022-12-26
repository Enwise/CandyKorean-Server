import {Routes} from "../interfaces/router.interfaces";
import {Router} from "express";
import WishlistController from "../controllers/wishlist.controller";

class WishlistRoute implements Routes {
    public path = '/wishlist';
    public router = Router();
    public wishlistController = new WishlistController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.wishlistController.getAllWishlist);
        this.router.get(`${this.path}/:id(\\d+)`, this.wishlistController.getWishlistByUser);
        this.router.post(`${this.path}`, this.wishlistController.createWishlist);
        this.router.delete(`${this.path}`, this.wishlistController.deleteWishlist);
    }
};

export default WishlistRoute;