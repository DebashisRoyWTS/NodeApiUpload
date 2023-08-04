const router = require('express').Router()
const crudApiController = require('../controller/crudApi.controller')

router.get('/', crudApiController.showMessage)
router.post('/insert', crudApiController.insert)
router.get('/fetchData', crudApiController.fetchData)
router.get('/delete/:id', crudApiController.delete)
router.post('/update/:id', crudApiController.update)

module.exports = router
