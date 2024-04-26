const {
    ApiError,
    InvalidContactFieldError,
    InvalidContactSchemaError,
    BlankContactFieldError,
    ContactNotFoundError,
    NoContactsFoundError,
    DuplicateContactResourceError,
    InvalidContactResourceError,
    PagerError,
    PagerNoResultsError,
    PagerOutOfRangeError,
    ResourceTestingError,
    ServerUnreachableError,
    ResourceImplementationError,
    ResourceUnreachableError,
    ContactModel,
    filterContacts,
    sortContacts,
    Pager
} = require('@jworkman-fs/asl');

const index = async (req, res) => {
    try {
        let results = ContactModel.index();
        console.log(`---------------Filter---------------------- ${req.get('X-Filter-Operator')} - ${req.get('X-Filter-Value')} - ${req.get('X-Filter-By')}`)
        results = filterContacts(
            req.get('X-Filter-By')||'id',
            req.get('X-Filter-Operator')||'gt',
            req.get('X-Filter-Value')||0,
            results
        );

        console.log(results[0], results[results.length - 1])

        results = sortContacts(
            results,
            req.query.sort || 'id',
            req.query.direction || 'asc'
        );

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const pager = new Pager(results, page, limit);


        res.set('X-Page-Total', String(pager.total));
        res.set('X-Page-Next', String(pager.next()));
        res.set('X-Page-Prev', String(pager.prev()));

        res.status(200).json(pager.results());
    } catch (error) {
        switch (error.name) {
            case "InvalidContactError":
            case "ContactNotFoundError":
                return res.status(error.statusCode).json({ message: error.message })
            case "ApiError":
            default:
                console.log('-------------------------- Error ---------------------------------')
                console.log(error)
                return res.status(500).json(error)
        }
    }
}

const create = (req, res) => {
    try {
        const newContact = ContactModel.create({...req.body});
        res.status(201).location(`/v1/contacts/${newContact.id}`).send(newContact);
    } catch (error) {
        switch (error.name) {
            case "InvalidContactFieldError":
            case "InvalidContactSchemaError":
                res.status(error.statusCode).json({ ...error });
                break;
            default:
                break;
        }
        res.status(400).json({ error: error.message });
    }
}

const show = (req, res) => {
    try {
        const contact = ContactModel.show(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const update = (req, res) => {
    try {
        const { firstname, lastname, email, phone, birthday } = req.body;
        const updatedContact = ContactModel.update(req.params.id, { firstname, lastname, email, phone, birthday });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const remove = (req, res) => {
    try {
        ContactModel.remove(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { index, create, show, update, remove};

