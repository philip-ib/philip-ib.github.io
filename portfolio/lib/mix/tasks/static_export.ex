defmodule Mix.Tasks.Static.Export do
  @moduledoc """
  Export the Phoenix portfolio site as static HTML/CSS for GitHub Pages.

  Usage:
      mix static.export

  Output goes to the repo root (parent of the portfolio/ directory).
  Commit and push the generated files to deploy to GitHub Pages.
  """

  use Mix.Task

  @shortdoc "Export Phoenix site as static files for GitHub Pages"

  @repo_root Path.expand("../../../..", __DIR__)

  def run(_args) do
    Mix.shell().info("\n🚀 Starting static export...\n")

    # 1. Start the app
    Mix.shell().info("[1/3] Starting application...")
    {:ok, _} = Application.ensure_all_started(:portfolio)

    # 2. Render homepage
    Mix.shell().info("[2/3] Rendering page...")
    html = render_homepage() |> clean_html()

    # 3. Clean old files, copy assets, write index.html
    Mix.shell().info("[3/3] Syncing assets...")
    clean_old_assets()
    copy_static_assets()

    index_path = Path.join(@repo_root, "index.html")
    File.write!(index_path, html)
    Mix.shell().info("  ✓ index.html written\n")

    Mix.shell().info("✅ Static export complete!")
    Mix.shell().info("   Open #{index_path} in your browser to preview.")
    Mix.shell().info("   Commit and push to deploy to GitHub Pages.\n")
  end

  defp render_homepage do
    conn =
      Plug.Test.conn(:get, "/")
      |> Plug.Conn.put_req_header("accept", "text/html")

    conn = PortfolioWeb.Endpoint.call(conn, [])
    conn.resp_body
  end

  defp clean_html(html) do
    html
    |> String.replace(~r/<!-- <.*?-->/, "")
    |> String.replace(~r/\sdata-phx-loc="\d+"/, "")
    |> String.replace(~r/\sphx-r/, "")
    |> String.replace(~r/\sphx-no-format/, "")
    |> String.replace(~r{(href|src)="/assets/}, "\\1=\"assets/")
    |> String.replace(~r{(href|src)="/images/}, "\\1=\"images/")
    |> String.replace(~r{(href|src)="/pdf/}, "\\1=\"pdf/")
    |> String.replace("phx-track-static ", "")
    |> String.replace(~r/<!-- @caller.*?-->/, "")
    |> String.replace(~r/\sdata-default="[^"]*"/, "")
  end

  # Remove old v1 directories that are no longer needed
  defp clean_old_assets do
    for dir <- ["css", "js", "fonts"] do
      path = Path.join(@repo_root, dir)
      if File.exists?(path) do
        File.rm_rf!(path)
        Mix.shell().info("  ✓ Removed old #{dir}/")
      end
    end

    # Remove old certificate images
    cert_dir = Path.join(@repo_root, "images/sertifikat")
    if File.exists?(cert_dir), do: File.rm_rf!(cert_dir)

    # Remove old index.html
    old_index = Path.join(@repo_root, "index.html")
    if File.exists?(old_index), do: File.rm!(old_index)
  end

  defp copy_static_assets do
    static_dir = priv_static_dir()

    for dir <- ["images", "pdf"] do
      src = Path.join(static_dir, dir)
      dst = Path.join(@repo_root, dir)
      if File.exists?(src) do
        File.rm_rf!(dst)
        File.cp_r!(src, dst)
      end
    end

    for file <- ["robots.txt", "favicon.ico"] do
      src = Path.join(static_dir, file)
      dst = Path.join(@repo_root, file)
      if File.exists?(src), do: File.cp!(src, dst)
    end
  end

  defp priv_static_dir do
    Application.app_dir(:portfolio, "priv/static")
  end
end
