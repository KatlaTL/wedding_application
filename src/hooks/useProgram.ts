import { Martini, Users, Utensils } from "lucide-react"
import type { ProgramType } from "../types/programTypes"


const useProgram = () => {
    const program: ProgramType[] = [
        {
            icon: Users,
            title: "Vielse",
            description: 'Vær med, når vi siger "ja" omgivet af familie og venner',
            location: "Køng Kirke",
            time: "kl. 12:30"
        },
        {
            icon: Martini,
            title: "Reception",
            description: "Vi tager til hjemstavnsgården hvor der er kage, drikkelse og andet sjov",
            location: "Hjemstavnsgården",
            time: "kl. 14:00"
        },
        {
            icon: Utensils,
            title: "Festmiddag",
            description: "Vi tager til præstegården i Odense hvor holder festmiddagen",
            location: "Georgsgade 50",
            time: "kl. 18:00"
        }
    ]


    return program;

}

export default useProgram;