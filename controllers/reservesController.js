const Reserve = require("../models/reserves");

const getReserves = async (req, res) => {
  const reserves = await Reserve.find().populate('user');
  res.json(reserves);
};

const getUserReserves = async (req, res) => {
    const reserves = await Reserve.find({user: req.user.id}).populate('user');
    res.json(reserves);
  };

const createReserve = async (req, res) => {
  const { dia, hora, telefono, cantidadPersonas } = req.body;
  const newReserve = new Reserve({
    user:req.user.id,
    dia,
    hora,
    telefono,
    cantidadPersonas,
  });
  const savedReserve = await newReserve.save();
  res.json(savedReserve);
};

const getReserve = async (req, res) => {
  const { id } = req.params;
  const reserve = await Reserve.findById(id).populate('user');
  if (!reserve)
    return res.status(404).json({ message: "Reserva no encontrada" });
  res.json(reserve);
};

const updateReserve = async (req, res) => {
  const { id } = req.params;
  const reserve = await Reserve.findByIdAndUpdate(id, req.body, { new: true });
  if (!reserve)
    return res.status(404).json({ message: "Reserva no encontrada" });
  res.json(reserve);
};

const deleteReserve = async (req, res) => {
  const { id } = req.params;
  const reserve = await Reserve.findByIdAndDelete(id);
  if (!reserve) return res.status(404).json({ message: "Reserva no encontrada" });
  return res.sendStatus(204);
};

module.exports = {
  getReserves,
  getUserReserves,
  getReserve,
  createReserve,
  updateReserve,
  deleteReserve,
};
