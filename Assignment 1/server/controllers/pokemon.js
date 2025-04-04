// Import the data service and express-validator
import dataService from '../service/dataService.js';
import { checkSchema } from 'express-validator';

// Initialize the Pokémon service
const pokemonService = dataService('pokemon');

// Define the Pokémon object with rules and methods
const pokemon = {
    rules: [checkSchema({
        page: {
            optional: true,
            toInt: true, // Convert to integer
            isInt: {
                options: { min: 1 },
                errorMessage: '"page" must be a positive number!',
            }
        },
        perPage: {
            isNumeric: true,
            errorMessage: `"perPage" must be a Number!`,
            optional: true
        }
    }, ['query']),
    checkSchema({
        user: {
            isNumeric: true,
            errorMessage: `"user" is needed as a Number!`,
            toInt: true
        }
    }, ['headers'])
    ],
    index: async function (_, res) {
        try {
            let ret;
            const user = _.headers['user'];
            if (_.params.name) {
                ret = await pokemonService.query(_.params.name);
            } else {
                ret = await pokemonService.load(_.query);
            }
            res.json(ret);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    add: async function (_, res) {
        try {
            const user = _.headers['user'];
            const userData = _.body.map(item => { 
                return { 
                    _id: item.name, 
                    ...item, 
                    user, 
                    createTime: Math.floor(Date.now() / 1000), 
                    updateTime: null 
                }; 
            });

            let ret = await pokemonService.add(userData);
            res.status(201).send({ message: ret });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    update: async function (_, res) {
        try {
            const userData = _.body;
            delete userData.createTime;
            userData.updateTime = Math.floor(Date.now() / 1000);
            let ret = await pokemonService.update(userData);
            res.status(200).send({ message: ret });
        } catch (err) {
            res.status(400).send(err);
        }
    },
    delete: async function (_, res) {
        try {
            const user = _.headers['user'];
            if (_.params.name) {
                let ret = await pokemonService.delete(_.params.name);
                res.status(200).send({ message: ret });
            } else {
                res.status(406).send('Not Accepted');
            }
        } catch (err) {
            res.status(400).send(err);
        }
    }
};

export default pokemon;
