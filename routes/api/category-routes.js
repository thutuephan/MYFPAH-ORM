const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      // `Include` attribute is for foreign keys. Category doesn't have any foreign key; id and category name are already inherent properties of Category, `include category` is not needed in this case???
      // be sure to include its associated Products

      include: [Product],
     attributes: ['id', 'category_name']
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      // without curly braces
      include: [Product]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // be sure to include its associated Products
  // in order for the app to run, I need to run the command `npm run seed` and then `npm start`, in `insomnia`: http:localhost:api/categories or categories/:id
  //The index.js file adds in the prefix /categories - but the route file won’t show it, so we have to combine them when we use insomnia

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
