import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-8 space-y-16">
      <section className="space-y-6">
        <h1 className="text-4xl md:text-6xl text-foreground">
          System <span className="text-monokai-blue">Architecture</span>
        </h1>
        <div className="h-1 w-24 bg-monokai-blue" />
        <p className="text-xl text-muted-foreground leading-relaxed">
          I am a digital photographer specializing in capturing high-contrast, structural environments. 
          My work is heavily influenced by software engineering, viewing the physical world through 
          the lens of syntax, structure, and compilation.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl text-foreground font-mono flex items-center gap-2">
            <span className="text-monokai-pink">#</span> HARDWARE_SPECS
          </h2>
          <ul className="space-y-4 font-mono text-sm text-muted-foreground">
            <li className="flex justify-between border-b border-border pb-2">
              <span>BODY</span>
              <span className="text-foreground">Sony A7R IV</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>PRIMARY_LENS</span>
              <span className="text-foreground">Sony FE 35mm f/1.4 GM</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>SECONDARY_LENS</span>
              <span className="text-foreground">Sony FE 85mm f/1.4 GM</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>DRONE</span>
              <span className="text-foreground">DJI Mavic 3 Pro</span>
            </li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl text-foreground font-mono flex items-center gap-2">
            <span className="text-monokai-green">#</span> SOFTWARE_STACK
          </h2>
          <ul className="space-y-4 font-mono text-sm text-muted-foreground">
            <li className="flex justify-between border-b border-border pb-2">
              <span>RAW_PROCESSOR</span>
              <span className="text-foreground">Capture One Pro</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>RETOUCHING</span>
              <span className="text-foreground">Adobe Photoshop</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>COLOR_GRADING</span>
              <span className="text-foreground">DaVinci Resolve</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span>ARCHIVE</span>
              <span className="text-foreground">Synology NAS 64TB</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
