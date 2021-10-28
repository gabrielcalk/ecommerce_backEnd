const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tag_data = await Tag.findAll({
      include: Product
    })
    res.status(200).json(tag_data)
  } catch(err){
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tag_id = await Tag.findByPk(req.params.id, {
      include: Product
    })
    tag_id ? res.status(200).json(tag_id) 
    : res.status(400).json('No Tag found') 
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
