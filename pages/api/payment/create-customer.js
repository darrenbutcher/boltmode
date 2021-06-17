import Stripe from 'stripe'
import prisma from '../../../lib/prisma'
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async (req, res) => {
  const createCustomer = async (email) => await stripe.customers.create({ email })
  const addCustomerId = async (customer) => await prisma.users.update({
    where: { uid: "a4b4a4ef-d3ce-4cd5-8938-9f56e6cd6afd" },
    data: { customerId: customer.id },
  })
  
  // chain async/await with dependent await
  const x = await [
    createCustomer,
    addCustomerId
  ].reduce(async (memo, fn) => fn(await memo), req.body.email);

  console.log(x)

  res.send({ customerId: x.customer_id })
}