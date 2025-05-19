import Cupons from '../models/CuponsModel.js';
import Orders from '../models/OrdersModel.js';
import OrdersProducts from '../models/OrdersProductsModel.js';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const orders = await Orders.findAll({
        order: [['id', 'asc']],
        include: [{
          model: OrdersProducts,
          as: 'orders_products'
        }]
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: orders,
      });
    }

    const order = await Orders.findOne({
      where: { id },
      include: [{
        model: OrdersProducts,
        as: 'orders_products'
      }]
    });

    if (!order) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: order,
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
      status,
      total,
      totalDiscount,
      idUserCustomer,
      idUserDeliver,
      idAddress,
      idPayment,
      idCupom,
    } = corpo;

    let cupom;
  
    if (idCupom) {
      cupom = await Cupons.findOne({
        where: {
          id: idCupom
        } 
      });

      if (!cupom) {
          return response;
      }

      if (cupom.uses <= 0) {
        return {
          type: 'error',
          message: 'Cupom sem usos disponíveis',
        };
      }
    }

    const response = await Orders.create({
      status,
      total,
      totalDiscount,
      idUserCustomer,
      idUserDeliver,
      idAddress,
      idPayment,
      idCupom,
    });

    if (cupom) {
      cupom.uses -= 1;
      await cupom.save();
    }

    return response;
  } catch (error) {
    throw new Error(error.message)
  }
  
};

const update = async (corpo, id) => {
  try {
      const response = await Orders.findOne({
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

      const response = await Orders.findOne({
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