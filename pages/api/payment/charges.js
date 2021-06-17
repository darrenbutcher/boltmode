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
    const charges = await stripe.charges.list({
      customer: req.body.customerId
    })

    const customerCharges = charges.data.map((d, idx) => {
      return {
        id: d.receipt_number || `${idx}A6FUJVR`,
        card: {
          brand: d.payment_method_details.card.brand,
          expYear: d.payment_method_details.card.exp_year,
          expMonth: d.payment_method_details.card.exp_month,
          last4: d.payment_method_details.card.last4
        },
        amount: d.amount,
        date: d.created,
        paid: d.paid,
        failed: d.failure_code ? true : false,
        receiptURL: d.receipt_url
      }
    })

    res.send(
     customerCharges
    )
    //res.send(charges)
  } else {
    res.send(data)
  } 
}