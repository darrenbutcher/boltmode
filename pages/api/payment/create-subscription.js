import Stripe from 'stripe'
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async (req, res) => {
    // Set the default payment method on the customer
    let paymentMethod
    try {
      paymentMethod = await stripe.paymentMethods.attach(
        req.body.paymentMethodId, {
          customer: req.body.customerId,
        }
      );
    } catch (error) {
      return res.status(200).send({ error: { message: error.message } })
    }
  
    let updateCustomerDefaultPaymentMethod = await stripe.customers.update(
      req.body.customerId,
      {
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
      }
    )
  
    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customerId,
      items: [{ price: req.body.priceId }],
      expand: ['latest_invoice.payment_intent'],
    });
  
    res.send(subscription)
}