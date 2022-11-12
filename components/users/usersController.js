const usersService = require('./usersService');

exports.profile = async (req, res) => {
  console.log("check")
  res.json({user : req.user});
}

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await usersService.checkingEmail(email)) {
      res.json({ message: -1 });
    }
    else {
      console.log(username);
      if (await usersService.findByUsername(username)) {
        res.json({ message: -2 });
      }
      else {
        const user = await usersService.register(username, email, password)
        res.json({ user, message: 1 });
      }
    }

  } catch (e) {
    res.status(400).json({ errorMessage: e.message ?? 'Unknown error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.user;
    const user = await usersService.findByUsername(username);
    const email = user.email;
    const accessToken = usersService.createAccessToken({ username, email });
    res.json({
      user: user,
      token: accessToken,
      message: "User logged in successfully!"
    });

  } catch (e) {
    res.status(400).json({ errorMessage: e.message ?? 'Unknown error' });
  }
};

