'use client'

import { useState } from "react";
import NotesToolBar from "@/components/NotesTool/NotesToolBar";
import NotesFilter from "./NotesFilter.client";

interface PropsViewFilter {
    tag: string
}

export default function FilterView({ tag }: PropsViewFilter) {
    const [search, setSearch] = useState('')
    return (
        <div>
        <NotesToolBar search={search} onSearch={setSearch} />
        <NotesFilter tag={tag} search={search} />
        </div>
    )
}
