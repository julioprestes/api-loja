import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { line_items, success_url, cancel_url } = req.body;
        // Validação básica dos campos obrigatórios
        if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
            return res.status(400).json({ error: 'line_items é obrigatório e deve ser um array com pelo menos um item.' });
        }
        if (!success_url || !cancel_url) {
            return res.status(400).json({ error: 'success_url e cancel_url são obrigatórios.' });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url,
            cancel_url,
        });
        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Erro Stripe:', error);
        res.status(500).json({ error: error.message || 'Erro interno ao criar sessão Stripe.' });
    }
};
