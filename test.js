const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Exercise = require('./models/Exercise');

router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    if (!exercises) {
      return res
        .status(401)
        .json({ errors: [{ msg: 'No exercises in database' }] });
    }
    res.json(exercises);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    check('description', 'Please enter a description')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { description } = req.body;

    try {
      const exercise = new Exercise({
        description
      });

      await exercise.save();
      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error!');
    }
  }
);

router.put('/:id', async (req, res) => {
  try {
    await Exercise.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      err => {
        if (err) throw err;
        res.json('Exercise Updated');
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
