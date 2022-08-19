const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req , res) => {
    
    const { items , email } = req.body;

    const transformedItems = items.map(item => ({
        description:items.description,
        quantity : 1,
        price_data: {
            currency: 'usd',
            unit_amount: 2000,
            product_data : {
                name:item.title,
                images:[ item.image],
            },
         }

        
    }));

    

    const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        // shipping_rates: ['shr_1LUcbUCJRAYwWte6LhbipGTB'],
        // shipping_address_collection: { 
        //     allowed_contries: ['GB' , 'US' , 'CA'],
        // },
        line_items: transformedItems,
       
        mode: 'payment',
        success_url: 'http://localhost:3000/',
        cancel_url: 'http://localhost:3000/',
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        },
    });

    

    res.status(200).json({ id : session.id });
};
