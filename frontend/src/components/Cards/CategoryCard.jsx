import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Heart, Sparkles, Baby, Activity } from 'lucide-react';

const categoryIcons = {
    education: GraduationCap,
    spiritual: Heart,
    fiction: BookOpen,
    'self-help': Sparkles,
    children: Baby,
    health: Activity,
};

export default function CategoryCard({ category, title, count }) {
    const Icon = categoryIcons[category] || BookOpen;

    return (
        <Link
            to={`/books?category=${category}`}
            className="card group hover:scale-105 transition-transform duration-300"
        >
            <div className="p-6 flex flex-col items-center text-center">
                {/* Icon with yellow background */}
                <div className="category-icon-bg mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-gray-800" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-1 text-[#1A1A1A] dark:text-white">
                    {title}
                </h3>

                {/* Count */}
                {count && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {count} {count === 1 ? 'book' : 'books'}
                    </p>
                )}
            </div>
        </Link>
    );
}
