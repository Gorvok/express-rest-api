const express = require('express');
const router = express.Router();
const contactsCtlr = require('../controllers/contacts');

router.get('/', contactsCtlr.index);
router.post('/', contactsCtlr.create);
router.get('/:id', contactsCtlr.show);
router.put('/:id', contactsCtlr.update);
router.delete('/:id', contactsCtlr.remove);


module.exports = router;
