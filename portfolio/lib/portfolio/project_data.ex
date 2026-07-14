defmodule Portfolio.ProjectData do
  @moduledoc """
  Dummy project data untuk section My Project.
  """

  @projects [
    %{
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Dashboard admin untuk platform e-commerce dengan fitur analitik penjualan, manajemen produk, dan laporan real-time.",
      image: "https://placehold.co/600x400/3b82f6/ffffff?text=E-Commerce",
      tags: ["Elixir", "Phoenix", "LiveView", "PostgreSQL"],
      link: "#"
    },
    %{
      id: "2",
      title: "Task Management App",
      description: "Aplikasi manajemen tugas kolaboratif dengan fitur drag-and-drop, real-time updates, dan integrasi kalender.",
      image: "https://placehold.co/600x400/10b981/ffffff?text=Task+Manager",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "#"
    },
    %{
      id: "3",
      title: "Weather Forecast UI",
      description: "Antarmuka ramalan cuaca interaktif dengan visualisasi data, peta animasi, dan notifikasi cuaca ekstrem.",
      image: "https://placehold.co/600x400/f59e0b/ffffff?text=Weather+App",
      tags: ["Vue.js", "D3.js", "OpenWeather API", "PWA"],
      link: "#"
    },
    %{
      id: "4",
      title: "Portfolio Website v1",
      description: "Website portofolio pribadi single-page dengan animasi scroll parallax dan tombol sosial media.",
      image: "https://placehold.co/600x400/8b5cf6/ffffff?text=Portfolio+v1",
      tags: ["HTML", "CSS", "Bootstrap", "jQuery"],
      link: "#"
    },
    %{
      id: "5",
      title: "Inventory Management System",
      description: "Sistem manajemen inventaris untuk UKM dengan fitur barcode scanning, stok otomatis, dan laporan bulanan.",
      image: "https://placehold.co/600x400/ef4444/ffffff?text=Inventory+System",
      tags: ["Laravel", "MySQL", "Bootstrap", "REST API"],
      link: "#"
    },
    %{
      id: "6",
      title: "Chat Application",
      description: "Aplikasi chatting real-time dengan fitur enkripsi end-to-end, group chat, dan berbagi file.",
      image: "https://placehold.co/600x400/06b6d4/ffffff?text=Chat+App",
      tags: ["Phoenix", "LiveView", "PubSub", "Tailwind"],
      link: "#"
    }
  ]

  @doc """
  Mengembalikan semua data project.
  """
  def all, do: @projects

  @doc """
  Mengembalikan jumlah project.
  """
  def count, do: length(@projects)
end
