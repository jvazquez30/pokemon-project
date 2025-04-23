'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    }

    return (
        <div></div>
    )
}