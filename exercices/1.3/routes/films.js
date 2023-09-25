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
    const orderByDuration = req?.query?.['minimum-duration'] ? req.query['minimum-duration'] : undefined;
    if(!orderByDuration){
        return res.json(tabfilm);
    }
    let tableauMinimumDuration = [];
    
    tabfilm.map((film) => {
        if(film.duration > orderByDuration){
            tableauMinimumDuration.push(film);
        };    
    });
    res.json(tableauMinimumDuration);
});

// read one film from ID
router.get('/:id', (req, res) => {
    console.log('GET /film');
    const indexOfFilm = tabfilm.findIndex((film) => film.id == req.params.id);

    if (indexOfFilm < 0) return res.sendStatus(404)

    res.json(tabfilm[indexOfFilm]);
});

router.post('/', (req, res) => {
    console.log("je suis dans la route post");
    const title = req?.body?.title?.lenght ? req.body.title : undefined;
    const duration = req?.body.duration > 0 ? req.body.duration : undefined;
    const budget = req?.body.budget > 0 ? req.body.budget : undefined;
    const link = req?.body.link?.lenght ? req.body.link : undefined;

    console.log("POST FILM");

    if(!title || !duration || !budget || !link){
        return res.sendStatus(400) //bad request;
    };
    
    let lastIndex = 0;

    tabfilm.map((film) => {
        if(film.id > lastIndex){
            lastIndex = film.id;
        };
    });

    const newFilm = {
        id: lastIndex +1,
        title,
        duration,
        budget,
        link,
    };

    tabfilm.push(newFilm);
    
    res.json(newFilm);
});
module.exports = router;