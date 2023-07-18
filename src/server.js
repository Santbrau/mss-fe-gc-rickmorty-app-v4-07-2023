const jsonServer = require('json-server');
const faker = require('faker');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'database.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Generar datos falsos utilizando Faker
const generateFakeData = () => {
    const data = {
        characters: []
    };

    for (let i = 0; i < 10; i++) {
        const character = {
            id: i + 1,
            name: faker.name.findName(),
            status: faker.random.arrayElement(['Alive', 'Dead', 'Unknown']),
            species: faker.random.arrayElement(['Human', 'Alien']),
            gender: faker.random.arrayElement(['Male', 'Female', 'Genderless']),
            origin: faker.address.country(),
            location: faker.address.city(),
            image: faker.image.avatar()
        };

        data.characters.push(character);
    }

    return data;
};

// Ruta para generar nuevos datos falsos
server.post('/generate-fake-data', (req, res) => {
    const data = generateFakeData();
    router.db.assign(data).write();
    res.status(200).json({ message: 'Fake data generated successfully!' });
});

// Ruta para actualizar datos
server.put('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCharacter = req.body;

    router.db
        .get('characters')
        .find({ id })
        .assign(updatedCharacter)
        .write();

    res.status(200).json(updatedCharacter);
});

// Ruta para eliminar datos
server.delete('/characters/:id', (req, res) => {
    const id = parseInt(req.params.id);

    router.db
        .get('characters')
        .remove({ id })
        .write();

    res.status(200).json({ message: 'Character deleted successfully!' });
});

// Configuración adicional del servidor JSON
server.use('/api', router);

// Iniciar el servidor en el puerto 3000
const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
