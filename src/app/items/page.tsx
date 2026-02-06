"use client"

import React from "react";
import { useState, useEffect } from "react";
import { getAllItems, ItemsList } from "./ItemsInfo";
import Link from "next/link";


export default function ItemsPage() {
  const [items, setItems] = useState<ItemsList | null>(null)


  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getAllItems();
        setItems(data)
      } catch (error) {
        console.error("Failed to get Items")
      }
    }
    fetchItems()
  }, [])





  return (
    <div>
      <div>
        <h1 className="text-center text-5xl p-2">Items</h1>
        <li className="grid grid-cols-4 p-1">
          {items ? (
            items.results.map((item) => (
              <Link key={item.name} href={`/items/${item.name}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link>
            ))
          ) : (
            <p>Loading Items.....</p>
          )}
        </li>
      </div>
    </div>
  )
}

