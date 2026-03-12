import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PainPointsSection } from "@/components/pain-points-section"
import { ValuePropositionSection } from "@/components/value-proposition-section"
import { GuideSection } from "@/components/guide-section"
import { StepsSection } from "@/components/steps-section"
import { BrandStorySection } from "@/components/brand-story-section"
import { FaqSection } from "@/components/faq-section"
import { VideoSection } from "@/components/video-section"
import { PricingSection } from "@/components/pricing-section"
import { MonitorSection } from "@/components/monitor-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* 1. ファーストビュー */}
        <HeroSection />

        {/* 2. リスク喚起 */}
        <PainPointsSection />

        {/* 3. 価値の提案 */}
        <ValuePropositionSection />

        {/* 4. 導き手（権威性） */}
        <GuideSection />

        {/* 5. 計画（利用ステップ） */}
        <StepsSection />

        {/* 6. 説明（ブランドストーリー） */}
        <BrandStorySection />

        {/* 6-2. FAQ */}
        <FaqSection />

        {/* 7. ビデオ */}
        <VideoSection />

        {/* 8. 価格 */}
        <PricingSection />

        {/* 9. PDFプレゼント（症状日誌ガイド） */}
        <MonitorSection />
      </main>

      {/* 10. フッター */}
      <Footer />
    </>
  )
}
