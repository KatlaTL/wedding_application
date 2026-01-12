import { ShoppingBag } from "lucide-react";


const CategoryInfo = () => {

    return (
        <div className="rounded-lg bg-tertiary/20 border-tertiary/30 border mx-auto p-6 mt-8">
            <ShoppingBag className="w-6 h-6 mx-auto mb-3 text-color-text"/>
            <p className="leading-relaxed">
                Når du vælger at købe en gave fra en kategori, så giv os besked, så andre kan se, hvilke kategorier der mangler flere gaver. Du kan tilmelde dig en kategori ved at bruge knapperne ude i højre side af kategorierne.
            </p>
        </div>
    )
}

export default CategoryInfo;