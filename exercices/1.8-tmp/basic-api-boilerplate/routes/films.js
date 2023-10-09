const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = `${__dirname  }/../data/films.json`;

const tabfilm = [
{
id: 1,
title: 'Case départ',
duration: 120,
budget: 10000000,
link: 'https://www.allocine.fr/film/fichefilm_gen_cfilm=182097.html#:~:text=Délinquance%20et%20immigration%20vont%20de,transmet%20de%20génération%20en%20génération',
},
{
id: 2,
title: 'Prisonners',
duration: 180,
budget: 2500000,
link: 'https://www.netflix.com/be-fr/title/70273235#:~:text=Après%20la%20disparition%20de%20sa,prendre%20les%20choses%20en%20main.&text=Regardez%20autant%20que%20vous%20voulez.&text=Hugh%20Jackman%20et%20Jake%20Gyllenhaal,Viola%20Davis%20et%20Terrence%20Howard',
},
{
id: 3,
title: 'Les 3 mousquetaires',
duration: 160,
budget: 1250000,
link: 'https://www.allocine.fr/film/fichefilm_gen_cfilm=288402.html#:~:text=Synopsis,à%20celui%20de%20la%20France',
},
];

router.get('/', (req, res) => {
// eslint-disable-next-line no-console
console.log('GET /films');
const filterByDuration = req?.query?.['minimum-duration'] ? Number(req.query['minimum-duration']) : undefined;
const films = parse(jsonDbPath, tabfilm);

if(!filterByDuration){
return res.json(films);
}
const tableauMinimumDuration = [];

// eslint-disable-next-line no-plusplus, no-undef
for(i = 0; i < films.length; i++){
// eslint-disable-next-line no-undef
if(films[i].duration >= filterByDuration){
// eslint-disable-next-line no-undef
tableauMinimumDuration.push(films[i])
}
}
return res.json(tableauMinimumDuration);
});

// eslint-disable-next-line consistent-return
router.get('/:id', (req, res) => {
// eslint-disable-next-line no-console
console.log(`GET /films/${req.params.id}`);

const films = parse(jsonDbPath, tabfilm);

const indexOfFilmFound = films.findIndex((film) => film.id === Number(req.params.id));

if(indexOfFilmFound < 0) return res.sendStatus(404);

res.json(films[indexOfFilmFound]);
});

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {

const title = req?.body?.title?.trim().length !== 0 ? req.body.title : undefined;
const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

// eslint-disable-next-line no-console
console.log('POST CREATE ONE');

if(!title|| !duration || !budget || !link || Number(duration) < 0 || budget < 0) return res.sendStatus(400);

const films = parse(jsonDbPath, tabfilm);

const index = films.length+1;

const filmExistant = films.find((film) => 
film.title.toLocaleLowerCase() === title.toLocaleLowerCase());

if(filmExistant){
    return res.sendStatus(409)
}


const newFilm = {
id: index,
title,
duration,
budget,
link,
};

films.push(newFilm);

serialize(jsonDbPath, films);

res.json(newFilm);
});

// eslint-disable-next-line consistent-return
router.delete('/:id', (req,res) => {
    // eslint-disable-next-line no-console
    console.log(`DELETE /pizzas/${req.params.id}`);

    const films = parse(jsonDbPath, tabfilm);

    const foundIndex = films.findIndex(film => film.id === Number(req.params.id));

    if(foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromTab = films.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromTab[0];

    serialize(jsonDbPath, films);

    res.json(itemRemoved);
});

// eslint-disable-next-line consistent-return
router.patch('/:id', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title?.trim().length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;
    
    // eslint-disable-next-line no-console
    console.log('POST /films');
    

    if(!title && !duration && !budget && !link) return res.sendStatus(400);

    if(Number(duration) < 0 || budget < 0) return res.sendStatus(400);

    const films = parse(jsonDbPath, tabfilm);

    const foundIndex = films.findIndex(film => film.id === Number(req.params.id));

    if(foundIndex < 0 ) return res.sendStatus(404);

    const updatedFilm = {...films[foundIndex], ...req.body};

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    res.json(updatedFilm);

});

// eslint-disable-next-line consistent-return
router.put('/:id', (req, res) => {
    // eslint-disable-next-line no-console
    console.log(`PUT /films/${req.params.id}`);

    const title = req?.body?.title?.trim().length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

    // eslint-disable-next-line no-console
    console.log('POST /films');
    
    if(!title|| !duration || !budget || !link || Number(duration) < 0 || budget < 0) return res.sendStatus(400);

    const films = parse(jsonDbPath, tabfilm);

    const foundIndex = films.findIndex(film => film.id === Number(req.params.id));
    
    if(foundIndex < 0){
        // eslint-disable-next-line no-undef
        const newFilm = {id, title, link, duration, budget};
        films.push(newFilm);
        return res.json(newFilm);
    }
    
    const updatedFilm = {...films[foundIndex], ...req.body};

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    res.json(updatedFilm);    

});

module.exports = router;
