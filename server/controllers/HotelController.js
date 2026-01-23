import Hotel from '../models/Hotel.js';
import User from '../models/user.js';

//register new hotel

export const registerHotel = async(req,res) => {
    try {
        const {name, address, contact, city} = req.body;
        const owner = req.user_id;

        const hotel = await Hotel.findOne({owner});
        if(hotel){
            return res.json({success:false, message:"You have already registered a hotel"});
        }
        await Hotel.create({
            name,
            address,
            contact,
            city,
            owner
        });
        await User.findByIdAndUpdate(owner, {role : 'hotelOwner'});
        res.json({success:true, message:"Hotel registered successfully"});
    } catch (error) {
        res.json({success:false, message:error.message});
    }
}