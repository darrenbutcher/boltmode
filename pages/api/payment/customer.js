import Stripe from 'stripe'
import prisma from '../../../lib/prisma'
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async (req, res) => {
  //req.body.email
  // const user = await prisma.user.findUnique({
  //   where: {
  //     name: capitalize(params.plan),
  //   },
  //   select: {
  //     name: true,
  //     price: true,
  //   },
  // })

//  req.body.customerId

  const data = {
    id: null,
    subscriptionId: null,
    subscriptionNickname: null,
    subscriptionItemId: null,
    isSubscriptionActive: null,
    paymentMethodId: null,
    currentPeriodStart: null,
    currentPeriodEnd: null,
  }

  if (req.body.customerId) {
    const customer = await stripe.customers.retrieve(
      req.
      body.customerId //'cus_IgrZTLwaUd9dgD'
    )
    res.send({
      id: customer.id,
      subscriptionId: customer.subscriptions.data[0].id,
      subscriptionNickname: customer.subscriptions.data[0].plan.nickname,
      subscriptionItemId: customer.subscriptions.data[0].items.data[0].id,
      isSubscriptionActive: customer.subscriptions.data[0].plan.active,
      paymentMethodId: customer.invoice_settings.default_payment_method,
      currentPeriodStart: customer.subscriptions.data[0].current_period_start,
      currentPeriodEnd: customer.subscriptions.data[0].current_period_end,
    })
  } else {
    res.send(data)
  } 
}