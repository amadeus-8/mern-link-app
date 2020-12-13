const {Router} = require('express')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortid = require('shortid')
const router = Router()

/* /t/code */
router.get('/:code', async (req, res) => {
        try {
            const link = await Link.findOne({ code: req.params.code })

            if(Link) {
                link.clicks++
                await link.save()
                return res.redirect(link.from)
            }

            req.status(404).json('Ссылка не найдена')
        } catch (e) {
            res.status(500).json({
                message: 'Server error'
            })
        }
    }
)

module.exports = router
