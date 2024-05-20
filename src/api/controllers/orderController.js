const Commande = require("../../models/Commande");


const takeOrder = async (req, res) => {
  try {
    const { ClientID, DateHeureCommande, Statut, TotalCommande, Details,Attente } = req.body;

    const newCommande = await Commande.create({
      ClientID,
      DateHeureCommande,
      Statut,
      TotalCommande,
      Details,
      Attente
    });

    res.status(201).send({ CommandeID: newCommande.CommandeID });
  } catch (error) {
    console.error(error); // Log the full error for server-side debugging
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).send({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
};

const displayOrdersWaiting = async (req, res) => {
    try {
        const commandes = await Commande.findAll({
            where: { Statut: 'waiting' }
        });
        // Send the commandes array directly
        res.status(200).send(commandes);
    } catch (error) {
        console.error('Failed to fetch waiting orders:', error);
        // In case of an error, you might still want to send an array, but empty or with an error object
        res.status(500).send([]); // Optionally send an array with error details if needed
    }
}

const displayOrdersProcessing = async (req, res) => {
    try {
        const commandes = await Commande.findAll({
            where: { Statut: 'processing' }
        });
        // Send the commandes array directly
        res.status(200).send(commandes);
    } catch (error) {
        console.error('Failed to fetch processing orders:', error);
        res.status(500).send([]); // Similarly, send an empty array on error
    }
}
const displayOrdersReady = async (req, res) => {
    try {
        const commandes = await Commande.findAll({
            where: { Statut: 'ready' }
        });
        // Send the commandes array directly
        res.status(200).send(commandes);
    } catch (error) {
        console.error('Failed to fetch processing orders:', error);
        res.status(500).send([]); // Similarly, send an empty array on error
    }
}
const updateStatus = async (req, res) => {
    const { CommandeID, Statut } = req.body;
    try {
        const order = await Commande.findByPk(CommandeID);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        order.Statut = Statut;
        await order.save();
        res.send({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}

const getOrderInfos = async (req, res) => {
    const { CommandeID } = req.query;
    try {
        const order = await Commande.findByPk(CommandeID);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        res.send(order);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}
// backend/controllers/orderController.js


const updateTimer = async (req, res) => {
    const { CommandeID, Attente } = req.body;
    try {
        const order = await Commande.findByPk(CommandeID);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        order.Attente = Attente;
        await order.save();
        res.send({ message: 'Order timer updated successfully', order });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
};

const deleteOrder = async (req, res) => {
    const { CommandeID } = req.body;
    try {
        const order = await Commande.findByPk(CommandeID);
        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }
        await order.destroy();
        res.send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'An error occurred', error });
    }
}

module.exports = {deleteOrder,updateTimer,getOrderInfos,takeOrder,displayOrdersWaiting,displayOrdersProcessing,updateStatus,displayOrdersReady };