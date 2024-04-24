const express = require('express');
const asl = require('@jworkman-fs/asl');
const router = express.Router();

router.use(express.json());

// GET all contacts
router.get('/', (req, res) => {
    try {
        let results = asl.ContactModel.index();


        if (req.headers['x-filter-by']) {
            results = asl.filterContacts(results, req.headers['x-filter-by'], req.headers['x-filter-operator'], req.headers['x-filter-value']);
        }


        if (req.query.sort) {
            results = asl.sortContacts(results, req.query.sort, req.query.direction || 'asc');
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const pager = new asl.Pager(results, page, limit);


        res.set('X-Page-Total', String(pager.total));
        res.set('X-Page-Next', String(pager.next()));
        res.set('X-Page-Prev', String(pager.prev()));

        res.status(200).json(pager.results());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST a new contact
router.post('/', (req, res) => {
    try {
        const { firstname, lastname, email, phone, birthday } = req.body;
        if (!firstname || !lastname || !email || !phone || !birthday) {
            throw new Error('All fields are required');
        }
        const newContact = asl.ContactModel.create(req.body);
        res.status(201).location(`/v1/contacts/${newContact.id}`).send(newContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET a single contact by ID
router.get('/:id', (req, res) => {
    try {
        const contact = asl.ContactModel.show(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// PUT update a contact by ID
router.put('/:id', (req, res) => {
    try {
        const { firstname, lastname, email, phone, birthday } = req.body;
        const updatedContact = asl.ContactModel.update(req.params.id, { firstname, lastname, email, phone, birthday });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a contact by ID
router.delete('/:id', (req, res) => {
    try {
        asl.ContactModel.remove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
