const express = require('express');
const router = express.Router();
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

router.get('/', function(req, res){
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}?side=question`);
});

router.get('/:id', function(req, res){
    const side = req.query.side;
    const id = req.params.id;
    if (!side) {
        return res.redirect(`/cards/${id}?side=question`)
    }
    const text = cards[id][side];
    //const hint = cards[id].hint;
    const name = req.cookies.username;

    const templateData = {id, text, name, side};

    if (side === 'question') {
        //templateData.hint = hint;
        templateData.sideLink = "answer";
        templateData.textLink = "Answer"
    } else if (side === 'answer') {
        templateData.sideLink = "question";
        templateData.textLink = "Question"
    } else {
        res.redirect("/cards");
    }
    res.render("card", templateData);
});





module.exports = router;


