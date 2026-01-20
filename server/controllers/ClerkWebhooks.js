import User from '../models/user.js';
import { Webhook } from 'svix';


const ClerkWebhooks = async (req, res) => {
    try {
        const webhookSecret = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

      await webhookSecret.verify(JSON.stringify(req.body), headers);
        const { type, data } = req.body;

        const userData = {
            _id: data.id,
            username: data.first_name + ' ' + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.image_url,
        }

        switch (type) {
            case 'user.created':{
                await User.create(userData);
                break;
            }
            case 'user.updated':{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
            case 'user.deleted':{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                res.json({success: true, message: 'Unhandled event type'});
                break;
        }

    } catch (error) {
        res.json({success: false, message: error.message});
    }

}

export default ClerkWebhooks;