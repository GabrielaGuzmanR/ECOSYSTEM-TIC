"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Recycle,
  Heart,
  Users,
  Building2,
  GraduationCap,
  Sprout,
  BookOpen,
  PenTool,
  CheckCircle,
  Globe,
  Menu,
  X,
  Lightbulb,
  TreePine,
  Sparkles,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Productos", href: "#productos" },
  { name: "Significado", href: "#significado" },
  { name: "Impacto", href: "#impacto" },
  { name: "Contacto", href: "#contacto" },
]

export default function EcoEscrituraLanding() {
  const [activeProduct, setActiveProduct] = useState("boligrafo")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentKitImage, setCurrentKitImage] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-rotate carousel for kit
  useEffect(() => {
    if (activeProduct === "kit") {
      const interval = setInterval(() => {
        setCurrentKitImage((prev) => (prev + 1) % 2)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [activeProduct])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const kitImages = [
    {
      src: "/images/esferos-removebg-preview.png",
      alt: "Bolígrafos EcoEscritura",
      title: "Bolígrafos Plantables",
      description: "4 bolígrafos con diferentes semillas",
    },
    {
      src: "/images/libreta-removebg-preview.png",
      alt: "Cuaderno EcoEscritura",
      title: "Cuaderno de Bambú",
      description: "Con tapas plantables y papel reciclado",
    },
  ]

  const products = {
    boligrafo: {
      name: "EcoEscritura Bolígrafo",
      description: "Un bolígrafo con tubo de cartón biodegradable y semillas adheridas para plantar",
      features: [
        "Tubo de cartón reciclado biodegradable",
        "Tinta vegetal no tóxica",
        "Semillas adheridas al tubo (albahaca, menta, girasoles)",
        "Fácil desarme para plantado al final de su vida útil",
      ],
      icon: PenTool,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      image: "/images/esferos-removebg-preview.png",
    },
    cuaderno: {
      name: "EcoCuaderno",
      description: "Cuaderno de papel reciclado con tapas plantables",
      features: [
        "Papel reciclado de bambú",
        "Tapas plantables biodegradables",
        "Semillas de flores silvestres o hierbas",
        "Espiral compostable",
      ],
      icon: BookOpen,
      color: "from-green-600 to-teal-600",
      bgColor: "bg-green-50",
      image: "/images/libreta-removebg-preview.png",
    },
    kit: {
      name: "EcoKit de Estudio",
      description: "Conjunto completo de papelería sostenible y plantable",
      features: [
        "4 Bolígrafos plantables con diferentes semillas",
        "Cuaderno de bambú con tapas plantables",
        "Reglas biodegradables incluidas",
        "Guía completa de plantado y cuidado",
      ],
      icon: GraduationCap,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      images: kitImages,
    },
  }

  const nextKitImage = () => {
    setCurrentKitImage((prev) => (prev + 1) % kitImages.length)
  }

  const prevKitImage = () => {
    setCurrentKitImage((prev) => (prev - 1 + kitImages.length) % kitImages.length)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/images/ecoescritura-logo.png"
                  alt="EcoEscritura Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrollY > 50 ? "text-green-700" : "text-white"
                }`}
              >
                EcoEscritura
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.replace("#", ""))}
                  className={`transition-colors duration-300 hover:text-green-500 ${
                    scrollY > 50 ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden transition-colors duration-300 ${scrollY > 50 ? "text-gray-900" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg animate-in slide-in-from-top-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.href.replace("#", ""))
                    setIsMenuOpen(false)
                  }}
                  className="block py-2 text-gray-700 hover:text-green-600 transition-colors w-full text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-green-400/30 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-emerald-400/20 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left-8 duration-1000">
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Revolución Sostenible
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-yellow-300 to-green-300 bg-clip-text text-transparent">
                    Eco
                  </span>
                  <span className="text-white">Escritura</span>
                </h1>
                <p className="text-2xl md:text-3xl text-green-100 font-medium">
                  Donde cada trazo
                  <span className="text-yellow-300"> planta </span>
                  el futuro
                </p>
                <p className="text-lg text-green-200 max-w-lg leading-relaxed">
                  Más que papelería: una experiencia que transforma tu escritura en vida. Escribe, aprende, planta y
                  crece junto a la naturaleza.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  onClick={() => scrollToSection("productos")}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Descubrir Magia
                </Button>
              </div>
            </div>
            <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-spin"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <Image
                      src="/images/esferos-removebg-preview.png"
                      alt="Bolígrafos EcoEscritura"
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <Image
                      src="/images/libreta-removebg-preview.png"
                      alt="Cuaderno EcoEscritura"
                      width={300}
                      height={300}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos Section */}
      <section id="productos" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in-50 duration-1000">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4">
              <Target className="w-4 h-4 mr-2" />
              Nuestra Línea
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              Productos que Cobran Vida
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada producto está diseñado para acompañarte en nuevas etapas, transformando tu experiencia de escritura
              en un acto de creación y cuidado ambiental.
            </p>
          </div>

          <Tabs value={activeProduct} onValueChange={setActiveProduct} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12 bg-gray-100 p-2 rounded-2xl max-w-2xl mx-auto">
              {Object.entries(products).map(([key, product]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`flex items-center gap-2 rounded-xl transition-all duration-300 ${
                    activeProduct === key
                      ? `bg-gradient-to-r ${product.color} text-white shadow-lg transform scale-105`
                      : "hover:bg-white/50"
                  }`}
                >
                  <product.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {key === "boligrafo" ? "Bolígrafo" : key === "cuaderno" ? "Cuaderno" : "Kit Completo"}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(products).map(([key, product]) => (
              <TabsContent key={key} value={key} className="animate-in fade-in-50 duration-500">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Product Image */}
                    <div className="relative">
                      <div className={`bg-gradient-to-br ${product.color} rounded-3xl p-8 shadow-2xl`}>
                        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/30 relative overflow-hidden">
                          {key === "kit" ? (
                            // Carousel for Kit
                            <div className="relative">
                              <div className="relative h-96 overflow-hidden rounded-xl">
                                {kitImages.map((img, index) => (
                                  <div
                                    key={index}
                                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                                      index === currentKitImage
                                        ? "opacity-100 transform translate-x-0"
                                        : index < currentKitImage
                                          ? "opacity-0 transform -translate-x-full"
                                          : "opacity-0 transform translate-x-full"
                                    }`}
                                  >
                                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                                      <Image
                                        src={img.src || "/placeholder.svg"}
                                        alt={img.alt}
                                        width={400}
                                        height={400}
                                        className="w-full h-auto max-h-72 object-contain"
                                      />
                                      <div className="text-center">
                                        <h4 className="text-white font-bold text-lg">{img.title}</h4>
                                        <p className="text-white/80 text-sm">{img.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Carousel Controls */}
                              <button
                                onClick={prevKitImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 group"
                              >
                                <ChevronLeft className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                              </button>
                              <button
                                onClick={nextKitImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-300 group"
                              >
                                <ChevronRight className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                              </button>

                              {/* Carousel Indicators */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                {kitImages.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setCurrentKitImage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                      index === currentKitImage ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          ) : (
                            // Single image for other products
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={500}
                              height={500}
                              className="w-full h-auto max-h-96 object-contain"
                            />
                          )}
                        </div>
                        {/* Floating decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/30 rounded-full animate-bounce"></div>
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/40 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div
                          className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${product.color} rounded-2xl shadow-lg`}
                        >
                          <product.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h3>
                        <p className="text-xl text-gray-600 leading-relaxed">{product.description}</p>
                      </div>

                      <div className="space-y-6">
                        <h4 className="font-bold text-2xl text-gray-900 flex items-center gap-3">
                          <Sparkles className="w-6 h-6 text-green-500" />
                          Características Mágicas
                        </h4>
                        <div className="grid gap-4">
                          {product.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-green-50 transition-all duration-300"
                            >
                              <div
                                className={`p-2 bg-gradient-to-r ${product.color} rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300`}
                              >
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-gray-700 group-hover:text-green-700 transition-colors duration-300 font-medium">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <h4 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900">
                          <TreePine className="w-5 h-5 text-green-500" />
                          Proceso de Transformación
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { step: 1, text: "Usa normalmente", color: "from-green-400 to-green-600" },
                            { step: 2, text: "Desarma cuidadosamente", color: "from-emerald-400 to-emerald-600" },
                            { step: 3, text: "Planta en tierra húmeda", color: "from-teal-400 to-teal-600" },
                            { step: 4, text: "¡Disfruta tu planta!", color: "from-green-500 to-green-700" },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3 group">
                              <div
                                className={`w-8 h-8 bg-gradient-to-r ${item.color} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-all duration-300`}
                              >
                                {item.step}
                              </div>
                              <span className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Significado Profundo Section */}
      <section
        id="significado"
        className="py-20 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full animate-spin"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-in fade-in-50 duration-1000">
            <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white mb-6 text-lg px-6 py-2">
              <Lightbulb className="w-5 h-5 mr-2" />
              El Alma del Producto
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Más que Papelería:
              </span>
              <br />
              <span className="text-white">Un Símbolo de</span>
              <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Transformación
              </span>
            </h2>
            <p className="text-xl text-green-200 max-w-4xl mx-auto leading-relaxed">
              EcoEscritura trasciende la funcionalidad para convertirse en un catalizador de cambio personal y
              ambiental. Cada producto lleva consigo una filosofía profunda de crecimiento, conexión y esperanza.
            </p>
          </div>

          {/* Reflexión Principal */}
          <div className="max-w-6xl mx-auto mb-16">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg animate-pulse">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    La Filosofía del Crecimiento Compartido
                  </h3>
                </div>
                <div className="prose prose-lg prose-invert max-w-none text-center">
                  <p className="text-lg md:text-xl text-green-300 leading-relaxed mb-6">
                    "En un mundo donde cada acción cuenta, EcoEscritura propone una reflexión profunda:
                    <span className="text-yellow-300 font-semibold">
                      {" "}
                      ¿Qué pasaría si cada herramienta que usamos dejara el mundo mejor de como lo encontró?
                    </span>
                    "
                  </p>
                  <p className="text-lg text-green-200 leading-relaxed">
                    No se trata solo de escribir palabras en papel. Se trata de escribir el futuro en la tierra. Cada
                    trazo es una semilla de intención, cada página una oportunidad de crecimiento, cada producto usado
                    una promesa cumplida con las generaciones futuras.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tres Pilares del Significado */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Sprout,
                title: "El Inicio de una Nueva Etapa",
                description:
                  "Cada producto marca el comienzo de algo nuevo. Mientras la planta crece, también lo hace el usuario, creando un paralelismo poético entre el desarrollo personal y el crecimiento natural.",
                color: "from-green-400 to-emerald-500",
                bgColor: "from-green-500/60 to-emerald-500/60",
              },
              {
                icon: Zap,
                title: "Pequeñas Acciones, Gran Impacto",
                description:
                  "En un mundo saturado de productos desechables, EcoEscritura demuestra que incluso el gesto más simple puede generar un cambio significativo. Es la prueba de que la revolución comienza con decisiones cotidianas.",
                color: "from-emerald-400 to-teal-500",
                bgColor: "from-emerald-500/60 to-teal-500/60",
              },
              {
                icon: Globe,
                title: "Conexión con la Naturaleza",
                description:
                  "Plantar el producto no es solo un acto ecológico; es un ritual de reconexión. Te invita a tocar la tierra, observar el crecimiento y recordar que somos parte de un ecosistema más grande.",
                color: "from-teal-400 to-green-500",
                bgColor: "from-teal-500/60 to-green-500/60",
              },
            ].map((pillar, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${pillar.bgColor} backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 p-4 bg-gradient-to-r ${pillar.color} rounded-2xl w-fit shadow-lg`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-100 leading-relaxed text-center">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Propuesta de Valor Mejorada */}
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                  Nuestra Promesa
                </span>
              </h3>
              <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-8">
                EcoEscritura es una invitación a replantear cómo consumimos y creamos. No se trata solo de escribir o
                tomar notas; se trata de
                <span className="text-green-300 font-semibold"> sembrar ideas</span>,
                <span className="text-emerald-300 font-semibold"> cultivar conocimiento</span> y
                <span className="text-teal-300 font-semibold"> cosechar un futuro más verde</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: Recycle,
                  title: "Sostenibilidad",
                  desc: "Reduce plástico y fomenta agricultura urbana",
                  color: "text-green-400",
                },
                {
                  icon: BookOpen,
                  title: "Educación",
                  desc: "Cada uso es una lección viva sobre sostenibilidad",
                  color: "text-emerald-400",
                },
                {
                  icon: Heart,
                  title: "Personalización",
                  desc: "Adaptable a estudiantes y empresas",
                  color: "text-teal-400",
                },
              ].map((item, index) => (
                <div key={index} className="space-y-4 group">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h4 className="font-bold text-lg text-white">{item.title}</h4>
                  <p className="text-green-200 group-hover:text-white transition-colors duration-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Público Objetivo Section */}
      <section id="impacto" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in-50 duration-1000">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4">
              <Users className="w-4 h-4 mr-2" />
              Nuestro Impacto
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              ¿Para Quién es EcoEscritura?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Users,
                title: "Estudiantes",
                subtitle: "Acompañándolos en su viaje académico",
                description:
                  "Perfecto para inculcar desde temprano la importancia de la sostenibilidad. Sus plantas crecen junto a sus logros académicos, creando una conexión especial entre aprendizaje y naturaleza.",
                color: "from-green-500 to-emerald-600",
                bgColor: "bg-green-50",
              },
              {
                icon: Building2,
                title: "Profesionales y Empresas",
                subtitle: "Regalos corporativos con propósito",
                description:
                  "Ideal como regalo corporativo personalizable con logotipos. Una herramienta para que las empresas demuestren su compromiso con la responsabilidad social y ambiental.",
                color: "from-emerald-500 to-teal-600",
                bgColor: "bg-emerald-50",
              },
            ].map((audience, index) => (
              <Card
                key={index}
                className={`border-0 shadow-xl ${audience.bgColor} hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden`}
              >
                <div className={`h-2 bg-gradient-to-r ${audience.color}`}></div>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 bg-gradient-to-r ${audience.color} rounded-2xl shadow-lg`}>
                      <audience.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{audience.title}</CardTitle>
                      <CardDescription className="text-lg">{audience.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contacto"
        className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500 text-white relative overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-spin"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-1000">
            <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2">
              <Sparkles className="w-5 h-5 mr-2" />
              ¡Únete a la Revolución!
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              ¿Quieres que tus palabras
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                dejen una huella viva?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-green-100 leading-relaxed">
              Únete a la revolución de EcoEscritura. Hagamos que cada trazo cuente para el planeta y para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-lg px-8 py-4"
                onClick={() => scrollToSection("productos")}
              >
                <Leaf className="w-6 h-6 mr-2" />
                Explorar Prototipos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Image
                  src="/images/ecoescritura-logo.png"
                  alt="EcoEscritura Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                EcoEscritura
              </h3>
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              <span className="text-green-400">Sembrando ideas</span>,
              <span className="text-emerald-400"> cultivando conocimiento</span>,
              <span className="text-teal-400"> cosechando un futuro más verde</span>.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span className="hover:text-green-400 transition-colors cursor-pointer">Contacto</span>
              <span>•</span>
              <span className="hover:text-emerald-400 transition-colors cursor-pointer">Prototipos</span>
              <span>•</span>
              <span className="hover:text-teal-400 transition-colors cursor-pointer">Personalización</span>
              <span>•</span>
              <span className="hover:text-green-400 transition-colors cursor-pointer">Soporte</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
