import Stripe from 'stripe'
import prisma from '../../../lib/prisma'
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async (req, res) => {

  // await prisma.users.update({
  //   where: { uid: "a4b4a4ef-d3ce-4cd5-8938-9f56e6cd6afd" },
  //   data: { customer_id: customer.id },
  // })

  const paymentMethod = await stripe.paymentMethods.retrieve(
    req.body.paymentMethodId
  )

  res.send(paymentMethod)
}