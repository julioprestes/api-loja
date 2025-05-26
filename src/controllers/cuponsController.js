import Cupons from '../models/CuponsModel.js';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Cupons.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Cupons.findOne({ where: { id } });

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
      code,
      type,
      value,
      uses,
    } = corpo;

    const response = await Cupons.create({
      code,
      type,
      value,
      uses,
    });

    return response;
  } catch (error) {
    throw new Error(error.message)
  }
};

const update = async (corpo, id) => {
  try {
      const response = await Cupons.findOne({
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

      const response = await Cupons.findOne({
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

export const verify = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).send({ message: "Código do cupom não informado" });
    }

    const cupom = await Cupons.findOne({ where: { code } });

    if (!cupom) {
      return res.status(200).send({ message: "Cupom não encontrado" });
    }

    if (cupom.uses <= 0) {
      return res.status(200).send({ message: "Cupom sem usos disponíveis" });
    }

    return res.status(200).send({
      ...cupom.dataValues,
      message: "Cupom válido"
    });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao verificar cupom", error: error.message });
  }
};

export default {
  get,
  persist,
  destroy,
  update,
  verify
};