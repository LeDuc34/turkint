const Basket = require( '../../models/Basket');

const addToBasket = async (req, res) => {
    try {
        const { ClientID, Article, Options, ArticlePrice } = req.body;

        // Find existing basket or create a new one if it doesn't exist
        let basket = await Basket.findOne({ where: { ClientID } });

        if (!basket) {
            // If no basket exists, create one with the new article
            basket = await Basket.create({
                ClientID,
                Articles: [{ Article, Options, ArticlePrice }],
                TotalPrice: ArticlePrice
            });
        } else {
            // If a basket exists, add the new article to the Articles array
            basket.Articles.push({ Article, Options, ArticlePrice });
            basket.TotalPrice += ArticlePrice; // Update the total price of the basket
            await basket.save(); // Save the updated basket
        }

        return res.status(201).send({ Basket: basket });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

exports.addToBasket = addToBasket;