import Image from "next/image"

const products = [
  {
    name: "ゼラニウムシール",
    quantity: "12枚入り×1袋",
    price: "3,000",
    status: "5月発売開始、予約受付中",
    image: "/images/product-geranium-1.png",
    cta: "今すぐ購入する",
    ctaHref: "https://shop.re-essence.com/products/肌に貼るアロマシール-aタイプ?variant=47437556678882",
    highlight: false,
  },
  {
    name: "ゼラニウムシール",
    quantity: "12枚入り×3袋",
    price: "8,100",
    originalPrice: "9,000",
    status: "5月発売開始、予約受付中",
    image: "/images/product-geranium-3.png",
    cta: "今すぐ購入する",
    ctaHref: "https://shop.re-essence.com/products/肌に貼るアロマシール-aタイプ?variant=47525367775458",
    highlight: true,
    badge: "10% OFF",
  },
  {
    name: "ラベンダーシール",
    quantity: "12枚入り×1袋",
    price: "3,000",
    status: "未発売、ウェイティングリスト受付中",
    image: "/images/product-lavender.jpg",
    cta: "リストに登録",
    ctaHref: "https://www.re-essence.com/waitlist?scent=lavender&quantity=1&intensity=2&price=3000",
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-14">
      <div className="px-5">
        <div className="text-center">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-accent">
            {"商品ラインナップ"}
          </p>
          <h2 className="text-xl font-bold leading-snug text-foreground">
            <span className="block">{"あなたに合った"}</span>
            <span className="block">{"香りを選ぶ"}</span>
          </h2>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {products.map((product, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border bg-card shadow-sm ${
                product.highlight
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-border"
              }`}
            >
              {product.badge && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  {product.badge}
                </div>
              )}

              <div className="flex items-stretch gap-3 p-3">
                {/* Product Image - aligned to button bottom */}
                <div className="relative w-24 shrink-0 overflow-hidden rounded-lg bg-secondary">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Info + Button */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-sm font-bold text-card-foreground">{product.name}</h3>
                  <p className="text-xs text-muted-foreground">{product.quantity}</p>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-base font-bold text-foreground">
                      {"¥"}{product.price}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{"（税込）"}</span>
                    {product.originalPrice && (
                      <span className="text-[10px] text-muted-foreground line-through">
                        {"¥"}{product.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[10px] text-muted-foreground">{product.status}</p>

                  {/* CTA Button - half width, aligned at bottom */}
                  <div className="mt-auto pt-2">
                    <a
                      href={"ctaHref" in product && product.ctaHref ? product.ctaHref : product.cta === "リストに登録" ? "#monitor" : "https://shop.re-essence.com"}
                      className={`inline-flex w-1/2 items-center justify-center rounded-full px-3 py-1.5 text-[10px] font-semibold transition-transform hover:scale-105 ${
                        product.highlight
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      {product.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
