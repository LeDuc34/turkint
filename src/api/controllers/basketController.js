const Basket = require('../../models/Basket');

const addToBasket = async (req, res) => {
    try {
        const { ClientID, Article, Options, ArticlePrice } = req.body;
        console.log(Options);
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
             // Mark the Articles field as changed
             basket.changed('Articles', true);
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

const displayBasket = async (req, res) => {
    try {
        const { ClientID } = req.query;
        const basket = await Basket.findOne({ where: { ClientID } });
        if (!basket) {
            return res.status(404).send({ message: 'Basket not found' });
        }
        return res.status(200).send({ Basket: basket });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while fetching the basket' });
    }
};

const clearBasket = async (req, res) => {
    try {
        const { ClientID } = req.query;
        const basket = await Basket.findOne({ where: { ClientID } });
        if (!basket) {
            return res.status(400).send({ message: 'Basket not found' });
        }
        await basket.destroy();
        res.status(200).send({ message: 'Basket cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred while clearing the basket' });
    }
};

const updateBasket = async (req, res) => {
    try {
        const { ClientID, Articles, TotalPrice } = req.body;
        let basket = await Basket.findOne({ where: { ClientID } });

        if (!basket) {
            return res.status(404).send({ message: 'Basket not found' });
        }

        basket.Articles = Articles;
        basket.TotalPrice = TotalPrice;
        basket.changed('Articles', true);

        await basket.save();

        return res.status(200).send({ Basket: basket });
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
};

module.exports = {
    addToBasket,
    displayBasket,
    clearBasket,
    updateBasket
};
