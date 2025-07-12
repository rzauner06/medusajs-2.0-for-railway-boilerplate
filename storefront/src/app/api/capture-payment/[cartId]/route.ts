import { sdk } from "@lib/config"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ cartId: string }>

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { cartId } = await params
  const { origin, searchParams } = req.nextUrl

  const paymentIntent = searchParams.get("payment_intent")
  const paymentIntentClientSecret = searchParams.get(
    "payment_intent_client_secret"
  )
  const redirectStatus = searchParams.get("redirect_status") || ""
  const countryCode = searchParams.get("country_code")

  // Retrieve the cart directly using the SDK
  const cart = await sdk.store.cart
    .retrieve(cartId, {})
    .then(({ cart }) => cart)
    .catch(() => null)

  if (!cart) {
    return NextResponse.redirect(`${origin}/${countryCode}`)
  }

  const paymentSession = cart.payment_collection?.payment_sessions?.find(
    (payment: any) => payment.data.id === paymentIntent
  )

  if (
    !paymentSession ||
    paymentSession.data.client_secret !== paymentIntentClientSecret ||
    !["pending", "succeeded"].includes(redirectStatus) ||
    !["pending", "authorized"].includes(paymentSession.status)
  ) {
    return NextResponse.redirect(
      `${origin}/${countryCode}/cart?step=review&error=payment_failed`
    )
  }

  // Complete the order
  const orderResult = await sdk.store.cart
    .complete(cartId, {})
    .then((res) => res)
    .catch(() => null)

  if (!orderResult || orderResult.type !== "order") {
    return NextResponse.redirect(
      `${origin}/${countryCode}/cart?step=review&error=order_failed`
    )
  }

  return NextResponse.redirect(
    `${origin}/${countryCode}/order/${orderResult.order.id}/confirmed`
  )
}
