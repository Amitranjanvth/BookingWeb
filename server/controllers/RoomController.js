import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import {v2 as cloudinary} from 'cloudinary';


// Create API for Room Controller

export const createRoom = async(req,res) => {
    try {
        const {roomType, pricePerNight, amenities} = req.body;
        const hotel = await Hotel.findOne({owner : req.auth.userId});
        if(!hotel){
            return res.json({success: false, message: "Hotel not found"});
        }

        //image upload to cloudinary can be added here

        const uploadImages = req.files.map((file) => {
            const response = cloudinary.uploader.upload(file.path);
            return response.secure_url;
        });

        const Images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight : +pricePerNight,
            amenities : JSON.parse(amenities),
            images: Images
        });
        res.json({success: true, message: "Room created successfully"});
       
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Create API for get all rooms of a hotel

export const getRooms = async(req,res) => {
  try {
     const rooms = await Room.find({isAvailable: true}).populate ({
        path: 'hotel',
        populate: {
            path: 'owner',
            select: 'image'
        }
     }).sort({createdAt: -1});
     res.json({success: true, rooms});
  } catch (error) {
    res.json({success: false, message: error.message});
  }
}


// Create API for getownersRooms

export const getOwnersRooms = async(req,res) => {
    try {
        const hotelData = await Hotel.findOne({owner: req.auth.userId});
        const rooms = await Room.find({hotel : hotelData._id.toString()}).populate('hotel');

        res.json({success: true, rooms});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}


// Create API for updateRoom Availability details

export const toggleRoomAvailability = async(req,res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.json({success: true, message: "Room availability updated successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}