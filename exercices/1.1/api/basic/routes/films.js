var express = require('express');
var router = express.Router();

const MENU = [
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
    res.json(MENU);
});

module.exports = router;