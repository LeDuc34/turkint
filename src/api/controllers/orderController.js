const Commande = require("../../models/Commande");

const takeOrder = async (req, res) => {
    try {
        const { ClientID, date, Statut, TotalCommande } = req.body;
        const newCommande = await Commande.create({ ClientID, date,Statut, TotalCommande });
        res.status(201).send({ Commande: newCommande });
    } catch (error) {
        console.error(error); // Log the full error for server-side debugging
        if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
}

module.exports = { takeOrder };