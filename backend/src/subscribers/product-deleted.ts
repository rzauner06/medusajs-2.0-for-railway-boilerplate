import type {
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/framework"

export default async function productDeletedHandler({
  event: { data },
}: SubscriberArgs<{ id: string }>) {
  // Send request to Next.js storefront to revalidate cache
  try {
    await fetch(`${process.env.STOREFRONT_URL}/api/revalidate?tags=products`)
    console.log(`Cache revalidation triggered for deleted product: ${data.id}`)
  } catch (error) {
    console.error(`Failed to revalidate cache for deleted product ${data.id}:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "product.deleted",
}
