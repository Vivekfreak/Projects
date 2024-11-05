"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown, Brain, BarChart2, Database, Github, Linkedin, Mail, Moon, Sun, ChevronRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

// Dynamically import Particles component
const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

// Dynamically import Chart component
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

// Personal information and links configuration
const personalInfo = {
  name: "Vivek Tawalare",
  email: "iamvivektawalare@gmail.com",
  phone: "+91 7276472228",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/vivektawalare",
  website: "https://shorturl.at/fIxFs",
}

export default function Component() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const projects = [
    {
      title: "Sales Performance Analysis",
      description: "Analyzed sales data to identify key performance indicators (KPIs) and trends, leading to a 10% increase in sales.",
      tools: "Excel, Power BI, SQL, Data Governance, Data Quality",
    },
    {
      title: "Customer Segmentation Model",
      description: "Developed a machine learning model to segment customers, resulting in targeted marketing campaigns and a 15% increase in customer retention.",
      tools: "Python, Scikit-learn, Pandas, Matplotlib",
    },
    {
      title: "Predictive Maintenance System",
      description: "Created a predictive maintenance system for manufacturing equipment, reducing downtime by 25% and maintenance costs by 20%.",
      tools: "Python, TensorFlow, IoT sensors, Time Series Analysis",
    },
  ]

  useEffect(() => {
    setMounted(true)
    
    // GSAP animations
    gsap.from(".skill-card", {
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      stagger: 0.2,
    })

    gsap.from(".experience-card", {
      scrollTrigger: {
        trigger: ".experience-section",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
      x: -50,
      opacity: 0,
      stagger: 0.2,
    })

    // Particle animation
    const particlesAnimation = gsap.to(".particles-js", {
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
    })

    return () => {
      particlesAnimation.kill()
    }
  }, [])

  if (!mounted) {
    return null
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const particlesOptions = {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: darkMode ? "#ffffff" : "#000000" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: darkMode ? "#ffffff" : "#000000",
        opacity: 0.4,
        width: 1,
      },
      move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false },
    },
  }

  const chartOptions = {
    chart: { id: "skills-radar" },
    xaxis: { categories: ["Python", "R", "SQL", "Machine Learning", "Data Viz"] },
    theme: { mode: darkMode ? "dark" : "light" },
  }

  const chartSeries = [{ name: "skill level", data: [8, 7, 9, 8, 9] }]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300" ref={ref}>
        <Particles className="absolute inset-0 particles-js" options={particlesOptions} />
        
        {/* Header with Dark Mode Toggle */}
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <Link href="#" className="text-xl font-bold">{personalInfo.name}</Link>
          <div className="flex items-center space-x-4">
            <Sun className="h-5 w-5" />
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-5 w-5" />
          </div>
        </header>

        {/* Hero Section with Parallax */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
          <motion.div
            style={{ y }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 dark:from-teal-800/20 dark:to-cyan-800/20" />
            <div className="absolute inset-0 backdrop-blur-3xl" />
          </motion.div>
          <div className="relative z-10 text-center space-y-6 p-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-300 dark:to-cyan-300"
            >
              Data Science Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300"
            >
              Transforming Data into Insights | 2+ Years Experience
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" className="rounded-full" asChild>
                <Link href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8"
          >
            <ArrowDown className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </motion.div>
        </section>

        {/* Skills Section with Grid and Chart */}
        <section className="py-20 px-4 skills-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Core Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Brain className="h-8 w-8" />,
                  title: "Machine Learning",
                  description: "Predictive Modeling, Deep Learning, NLP",
                },
                {
                  icon: <BarChart2 className="h-8 w-8" />,
                  title: "Data Visualization",
                  description: "Power BI, Tableau, Matplotlib, Seaborn, Plotly",
                },
                {
                  icon: <Database className="h-8 w-8" />,
                  title: "Data Analysis",
                  description: "Python, R, SQL, Excel, ETL, EDA",
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                    <CardContent className="p-6 text-center space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                          {skill.icon}
                        </div>
                        <h3 className="text-xl font-semibold">{skill.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{skill.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Skill Proficiency</h3>
                <Chart options={chartOptions} series={chartSeries} type="radar" height={350} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4 bg-white/50 dark:bg-gray-900/50 experience-section">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Work Experience</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div className="experience-card" whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Data Analyst | INVESTWISELY</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">March 2023 - Present (2+ Years)</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Conducted comprehensive data analyses on financial market trends</li>
                    <li>Developed and maintained data models for market movement forecasting</li>
                    <li>Created algorithms for risk assessment and market opportunity identification</li>
                    <li>Improved forecasting accuracy and reduced financial risks</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div className="experience-card" whileHover={{ scale: 1.02 }}>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Intern | AI Variant</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Sept 2022 - March 2023 (6 months)</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Developed a live video processing system for social distancing and person tracking</li>
                    <li>Applied computer vision techniques for object detection and tracking</li>
                    <li>Built and deployed SVMs and Linear Regression models for prediction tasks</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-teal-600 dark:text-teal-400">
                      {projects[activeProject].title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {projects[activeProject].description}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Tools: {projects[activeProject].tools}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center space-x-2">
              {projects.map((_, index) => (
                <Button
                  key={index}
                  variant={activeProject === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => setActiveProject(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-teal-100/50 dark:to-teal-900/20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
            <p className="text-gray-700 dark:text-gray-300">Let's collaborate on your next data science project</p>
            <div className="flex flex-col items-center space-y-4">
              <Button className="rounded-full" size="lg" asChild>
                <Link href={`mailto:${personalInfo.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Me
                </Link>
              </Button>
              <p className="text-gray-600 dark:text-gray-400">
                Phone: <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Website: <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{personalInfo.website}</a>
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}