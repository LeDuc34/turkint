import Commande from '../models/Commande';

const commandRequest = async () => {
    try {
        const { ClientID, DateHeureCommande, TypeCommande, Statut, TotalCommande } = req.body;
        const newCommande = await Commande.create({ ClientID, DateHeureCommande, TypeCommande, Statut, TotalCommande });
        res.status(201).send({ Commande: newCommande });
    } catch (error) {
        console.error(error); // Log the full error for server-side debugging
        if (error.name === 'ValidationError') {
        return res.status(400).send({ message: 'Validation error', errors: error.errors });
        }
        res.status(500).send({ message: 'An unexpected error occurred' });
    }
}