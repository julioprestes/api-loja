import Addresses from '../models/AddressesModel.js';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Addresses.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Addresses.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (corpo) => {
  try {
    const {
      zipCode,
      state,
      city,
      street,
      district,
      numberForget,
      idUser,
    } = corpo;
  
    const response = await Addresses.create({
      zipCode,
      state,
      city,
      street,
      district,
      numberForget,
      idUser,
    });
    return response;
  } catch (error) {
      throw new Error(error.message)
  }
};

const update = async (corpo, id) => {
  try {
      const response = await Addresses.findOne({
          where: {
              id
          }
      });

      if (!response) {
          throw new Error('Não achou');
      }

      Object.keys(corpo).forEach((item) => response[item] = corpo[item]);
      await response.save();

      return response;
  } catch (error) {
      throw new Error(error.message)
  }
}

const persist = async (req, res) => {
  try {
      const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

      if (!id) {
          const response = await create(req.body)
          return res.status(201).send({
              message: 'Criado com sucesso!',
              data: response
          });
      }

      const response = await update(req.body, id);
          return res.status(201).send({
              message: 'Atualizado com sucesso!',
              data: response
          });
  } catch (error) {
      return res.status(500).send({
          message: error.message
      });
  }
}

const destroy = async (req, res) => {
  try {
      const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;
      if (!id) {
          res.status(400).send('informa ai paezon')
      }

      const response = await Addresses.findOne({
          where: {
              id
          }
      });

      if (!response) {
          return res.status(404).send('nao achou')
      }

      await response.destroy();

      return res.status(200).send({
          message: 'registro excluido',
          data: response
      })

  } catch (error) {
      return res.status(500).send({
          message: error.message
      });
  }
}

export default {
  get,
  persist,
  destroy,
  update,
};