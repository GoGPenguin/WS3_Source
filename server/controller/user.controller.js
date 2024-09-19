const User = require("../model/Users");

module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
};

module.exports.createUser = async (req, res) => {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      id: req.body.id,
    });


  res.status(200).json(user);
};

module.exports.deleteUser = async (req, res) => {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json(user);
};
