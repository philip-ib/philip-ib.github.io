defmodule PortfolioWeb.PageController do
  use PortfolioWeb, :controller

  def home(conn, _params) do
    render(conn, :home,
      page_title: "Philip Imanuel Balangkaehe",
      projects: Portfolio.ProjectData.all()
    )
  end
end
