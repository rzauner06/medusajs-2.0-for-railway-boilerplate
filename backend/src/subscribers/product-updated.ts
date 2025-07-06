import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"

export default async function productUpdatedHandler({
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  // Send request to Next.js storefront to revalidate cache
  try {
    await fetch(`${process.env.STOREFRONT_URL}/api/revalidate?tags=products`)
    console.log(`Cache revalidation triggered for updated product: ${data.id}`)
  } catch (error) {
    console.error(`Failed to revalidate cache for updated product ${data.id}:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "product.updated",
}
