import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"

const Hero = () => {
  return (
    <div 
      className="h-[75vh] w-full border-b border-ui-border-base relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Homepage-bg-mountain.png')",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-5"></div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <Heading
            level="h1"
            className="text-4xl leading-tight text-white font-bold drop-shadow-lg"
          >
            Welcome to Our Store
          </Heading>
          <Heading
            level="h2"
            className="text-xl leading-relaxed text-white font-normal drop-shadow-md"
          >
            Discover amazing products at great prices
          </Heading>
        </span>
        <Button 
          variant="secondary"
          className="bg-white text-black hover:bg-gray-100 font-medium px-8 py-3"
        >
          Shop Now
        </Button>
      </div>
    </div>
  )
}

export default Hero
