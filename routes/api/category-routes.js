const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [{
      model: Product,
      attributes: [
        'name',
        'price',
        'stock'
      ]
    }]
  })
  .then(categories => {
    console.log(categories)
    res.json(categories)
  }).catch(err =>{
    console.log(err)
    res.status(500).json(err);
  })

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      where: { category_id: req.params.id}
    }]
  })
    .then(categories => {
      if (!categories) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categories);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    name: req.body.name
  })
  .then(category => {
    if (!category[0]) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(category);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      if (!category[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(category => {
      if (!category) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(category);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
