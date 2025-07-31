const userService = require('../services/user.service');

exports.getUserWithMusics = async (req, res) => {
  try {
    const userId = req.params.id;
    const result = await userService.getUserWithMusics(userId);
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createMusic = async (req, res) => {
  try{
    const result = await userService.CreateMusic(req.body.music); 
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.login = async(req , res) => {
  try{
  const result = await userService.Login(req.body.login); 
    res.json(result);
  }
  catch (err){
    res.status(500).json({ error: err.message });
  }
};