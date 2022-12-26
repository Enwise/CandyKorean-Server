import {NextFunction, Request, Response} from "express";
import {Wishlist} from "../interfaces/wishlist.interface";
import WishlistService from "../services/wishlist.service";
import {CreateWishlistDto} from "../dtos/wishlist.dto";

class WishlistController {
    public wishlistService = new WishlistService();

    public getAllWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllWishlistData: Wishlist[] = await this.wishlistService.findAllWishlists();

            res.status(200).json({data: findAllWishlistData, message: 'findAll'});
        } catch (error) {
            next(error);
        }
    }

    public getWishlistByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id);
            const findWishlistByUserData: Wishlist[] = await this.wishlistService.findWishllistByUser(userId);

            res.status(200).json({data: findWishlistByUserData, message: 'findByUser'});
        } catch (error) {
            next(error);
        }
    }

    public createWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const wishlistData: CreateWishlistDto = req.body;
            const createWishlistData: Wishlist = await this.wishlistService.createWishlist(wishlistData);

            res.status(201).json({data: createWishlistData, message: 'created'});
        }
        catch (error) {
            next(error);
        }
    }

    public deleteWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const wishlistData: CreateWishlistDto = req.body;
            const deleteWishlistData: Wishlist = await this.wishlistService.deleteWishlist(wishlistData);

            res.status(201).json({data: deleteWishlistData, message: 'deleted'});
        }
        catch (error) {
            next(error);
        }
    }
}

export default WishlistController;