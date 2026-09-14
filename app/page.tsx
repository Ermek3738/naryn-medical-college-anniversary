import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/sections/hero"
import { Invitation } from "@/components/sections/invitation"
import { Program } from "@/components/sections/program"
import { Venues } from "@/components/sections/venues"
import { Gallery } from "@/components/sections/gallery"
import { Rsvp } from "@/components/sections/rsvp"
import { FinalScreen } from "@/components/sections/final-screen"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Invitation />
        <Program />
        <Venues />
        <Gallery />
        <Rsvp />
        <FinalScreen />
      </main>
    </>
  )
}
