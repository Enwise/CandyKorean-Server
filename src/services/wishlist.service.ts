import {isEmpty} from "../utils/util";
import {HttpException} from "../exceptions/HttpException";
import {Wishlist} from "../interfaces/wishlist.interface";
import {AppDataSource} from "../config/data-source";
import {WishListEntity} from "../entities/wishlist.entity";
import {CreateWishlistDto} from "../dtos/wishlist.dto";

class WishlistService {
    public async findAllWishlists(): Promise<Wishlist[]>{
        const wishlists: Wishlist[] = await AppDataSource.getRepository(WishListEntity).find({
            relations: {
                user: true,
                course: true
            }
        })

        return wishlists;
    }

    public async findWishllistByUser(userId: number): Promise<Wishlist[]> {
        if (isEmpty(userId)) throw new HttpException(400, "UserId is empty");

        const wishlistByUser: Wishlist[] = await WishListEntity.find({
            where: {
                user_id: userId
            }
        });

        return wishlistByUser;
    }

    public async createWishlist(wishlistData: CreateWishlistDto): Promise<Wishlist>{
        if (isEmpty(wishlistData)) throw new HttpException(400, "wishlistData is empty");
        const findWishlist: Wishlist = await WishListEntity.findOne({
            where: {
                user_id: wishlistData.user_id,
                course_id: wishlistData.course_id
            }
        });

        if (findWishlist) throw new HttpException(409, "This wishlist is already exists");

        const createWishlistData: Wishlist = await WishListEntity.create({...wishlistData}).save();

        return createWishlistData;
    }

    public async deleteWishlist(wishlistData: CreateWishlistDto): Promise<Wishlist>{
        if (isEmpty(wishlistData)) throw new HttpException(400, "wishlistData is empty");
        const findWishlist: Wishlist = await WishListEntity.findOne({
            where: {
                user_id: wishlistData.user_id,
                course_id: wishlistData.course_id
            }
        });

        if (!findWishlist) throw new HttpException(409, "This wishlist is not exists");

        await WishListEntity.delete(findWishlist);

        return findWishlist;
    }



}

export default WishlistService;