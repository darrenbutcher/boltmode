import Stripe from 'stripe'
import prisma from '../../../lib/prisma'
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async (req, res) => {

  const data = {
    id: null,
    dateAtempted: null,
    paymentMethod: null,
    total: null,
    status: null,
    invoiceURL: null
  }

  // invoiceID data[0].number
  // date tried / paid (data[0].created) ==>
  //     "status_transitions": {
  //         "finalized_at": 1588481306,
  //         "marked_uncollectible_at": null,
  //         "paid_at": 1588481307,
  //         "voided_at": null
  //       },
  // pyament medthod (card type and last 4 digits) (data[0].default_payment_method)
  // plan price / amount paid due (data[0].amount_paid) / data[0].total
  // recipt pdf link (data[0].invoice_pdf)
  // status data[0].status
  
  //      "number": "67B92E40-0001",
  //       "paid": true,





  if (true) {
    const invoice = await stripe.invoices.list({
      customer: 'cus_IgrZTLwaUd9dgD' //req.body.customerId
    })
    // res.send({
    //   id: invoice.data[0].number,
    //   // dateAtempted: invoice.,
    //   paymentMethodCard: {
    //     // brand: invoice.data[0].default_payment_method.card.brand,
    //     // expYear: invoice.data[0].default_payment_method.card.exp_year,
    //     // expMonth: invoice.data[0].default_payment_method.card.exp_month,
    //     card: invoice.data[0].default_payment_method
    //   },
    //   total: invoice.data[0].total,
    //   status: invoice.data[0].status,
    //   invoiceURL: invoice.data[0].invoice_pdf
    // })
    res.send(invoice)
  } else {
    res.send(data)
  } 
}