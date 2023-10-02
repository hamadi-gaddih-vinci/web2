var express = require('express');
var router = express.Router();

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

router.get('/', (req, res, next) => {
console.log('GET /films');
const filterByDuration = req?.query?.['minimum-duration'] ? Number(req.query['minimum-duration']) : undefined;
if(!filterByDuration){
return res.json(tabfilm);
}
let tableauMinimumDuration = [];

for(i = 0; i < tabfilm.length; i++){
if(tabfilm[i].duration >= filterByDuration){
tableauMinimumDuration.push(tabfilm[i])
}
}
return res.json(tableauMinimumDuration);
});

router.get('/:id', (req, res, next) => {
console.log(`GET /films/${req.params.id}`);

const indexOfFilmFound = tabfilm.findIndex((film) => film.id == req.params.id);

if(indexOfFilmFound < 0) return res.sendStatus(404);

res.json(tabfilm[indexOfFilmFound]);
});

router.post('/', (req, res, next) => {

const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

console.log('POST CREATE ONE');

if(!title|| !duration || !budget || !link || Number(duration) < 0 || budget < 0) return res.sendStatus(400);

const index = tabfilm.length+1;

const filmExistant = tabfilm.find((film) => 
film.title.toLocaleLowerCase() === title.toLocaleLowerCase());

if(filmExistant){
    return res.sendStatus(409)
}


const newFilm = {
id: index,
title: title,
duration: duration,
budget: budget,
link: link,
};

tabfilm.push(newFilm);


res.json(newFilm);
});

router.delete('/:id', (req,res) => {
    console.log(`DELETE /pizzas/${req.params.id}`);

    const foundIndex = tabfilm.findIndex(film => film.id === req.params.id);

    if(foundIndex < 0) return res.sendStatus(404);

    const itemsRemovedFromTab = tabfilm.splice(foundIndex, 1);
    const itemRemoved = itemsRemovedFromTab[0];

    res.json(itemRemoved);
});

router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);

    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    console.log('POST /films');
    //terminer;
})
module.exports = router;
