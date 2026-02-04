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
        <h1>Items</h1>
        <li>
          {items ? (
            items.results.map((item) => (
              <Link key={item.name} href={`/items/${item.name}`}>{item.name}</Link>
            ))
          ) : (
            <p>Loading Items.....</p>
          )}
        </li>
      </div>
    </div>
  )
}

