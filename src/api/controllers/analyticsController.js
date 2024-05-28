const Commande = require('../../models/Commande');

const getSauceCount = async (req, res) => {
    try {
        const commands = await Commande.findAll();
        const sauceCount = {};

        commands.forEach(command => {
            command.Details.forEach(detail => {
                if (detail.Options && detail.Options.sauce) {
                    const sauce = detail.Options.sauce;
                    if (!sauceCount[sauce]) {
                        sauceCount[sauce] = 0;
                    }
                    sauceCount[sauce]++;
                }
            });
        });

        res.status(200).json(sauceCount);
    } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
}
const getBreadCount = async (req, res) => {
    try {
        const commands = await Commande.findAll();
        const breadCount = {};

        commands.forEach(command => {
            command.Details.forEach(detail => {
                if (detail.Options && detail.Options.pain) {
                    const bread = detail.Options.pain;
                    if (!breadCount[bread]) {
                        breadCount[bread] = 0;
                    }
                    breadCount[bread]++;
                }
            });
        });

        res.status(200).json(breadCount);
    } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
}


const getVegetableCount = async (req, res) => {
    try {
        const commands = await Commande.findAll();
        const vegetableCount = {
            salade: 0,
            tomate: 0,
            oignon: 0,
        };

        commands.forEach(command => {
            command.Details.forEach(detail => {
                if (detail.Options) {
                    if (detail.Options.salade === "oui") {
                        vegetableCount.salade++;
                    }
                    if (detail.Options.tomate === "oui") {
                        vegetableCount.tomate++;
                    }
                    if (detail.Options.oignon === "oui") {
                        vegetableCount.oignon++;
                    }
                }
            });
        });

        res.status(200).json(vegetableCount);
    } catch (error) {
        console.error('Échec de la récupération des données analytiques:', error);
        res.status(500).json({ error: 'Échec de la récupération des données analytiques' });
    }
}

const getCommandCount = async (req, res) => {
    console.log('getCommandCount function called'); // Ensure the function is called
    try {
        const { month, year } = req.query; // Get the month and year parameters from the query
        const commands = await Commande.findAll({
            attributes: ['DateHeureCommande'],
        });

        console.log('Commands retrieved:', commands); // Log the retrieved commands

        // Initialize an array with 31 elements set to 0
        const commandCount = Array(31).fill(0);

        commands.forEach(command => {
            const date = new Date(command.DateHeureCommande);
            const commandMonth = date.getUTCMonth(); // Get the month (0-11)
            const commandYear = date.getUTCFullYear(); // Get the year

            // Check if the command is in the selected month and year
            if (commandMonth === parseInt(month) && commandYear === parseInt(year)) {
                const day = date.getUTCDate(); // Get the day of the month (1-31)
                // Increment the command count for the corresponding day
                commandCount[day - 1]++;
            }
        });

        console.log('Command count by day:', commandCount); // Log the command count array
        res.status(200).json(commandCount);
    } catch (error) {
        console.error('Échec de la récupération des données analytiques:', error);
        res.status(500).json({ error: 'Échec de la récupération des données analytiques' });
    }
}

const getCommandCountByMonth = async (req, res) => {
    console.log('getCommandCountByMonth function called'); // Ensure the function is called
    try {
        const { year } = req.query; // Get the year parameter from the query
        const commands = await Commande.findAll({
            attributes: ['DateHeureCommande'],
        });

        console.log('Commands retrieved:', commands); // Log the retrieved commands

        // Initialize an object to hold the count of commands per month
        const commandCountByMonth = {};

        commands.forEach(command => {
            const date = new Date(command.DateHeureCommande);
            const commandYear = date.getUTCFullYear(); // Get the year
            const month = date.getUTCMonth(); // Get the month (0-11)

            // Check if the command is in the selected year
            if (commandYear === parseInt(year)) {
                if (!commandCountByMonth[month]) {
                    commandCountByMonth[month] = 0;
                }
                // Increment the command count for the corresponding month
                commandCountByMonth[month]++;
            }
        });

        // Convert the object to an array with 12 elements (one for each month)
        const commandCountArray = Array.from({ length: 12 }, (_, i) => commandCountByMonth[i] || 0);

        console.log('Command count by month:', commandCountArray); // Log the command count array
        res.status(200).json(commandCountArray);
    } catch (error) {
        console.error('Échec de la récupération des données analytiques:', error);
        res.status(500).json({ error: 'Échec de la récupération des données analytiques' });
    }
}

module.exports = { getCommandCount, getSauceCount, getBreadCount, getVegetableCount, getCommandCountByMonth };

