const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

/**
 * @async
 * Getting all the Tags and include the respective Product
 */
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

/**
 * @async
 * Finding one Tag by ID, include the respective product and show it
 */
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

/**
 * @async
 * Creating a new tag
 */
router.post('/', async(req, res) => {
  try{
    const tag_post = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(tag_post)
  }catch(err){
    res.status(500).json(err)
  }
});

/**
 * @async
 * Finding one Tag by ID and updated with the body values.
 */
router.put('/:id', async (req, res) => {
  try{
    const tag_update = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    tag_update ? res.status(200).json(`id: ${req.params.id} has been update`)
    : res.status(500).json('Could not find this id')
  }catch(err){
    res.status(500).json(err)
  }
});

/**
 * @async
 * Finding one Tag by ID and delete it.
 */
router.delete('/:id', async (req, res) => {
  try{
    const tag_delete = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    tag_delete ? res.status(200).json(`id: ${req.params.id} has been deleter`)
    : res.status(500).json('Could not find this id')
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
