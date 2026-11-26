import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import "@/utils/i18n"
import CommandPalette from "./CommandPalette/CommandPalette"
import Testimonials from "./Testimonials/Testimonials"

function Where() {
  return <p data-testid="where">{useLocation().pathname}</p>
}

function renderPalette(onClose = () => {}) {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="*" element={<><CommandPalette onClose={onClose} /><Where /></>} />
      </Routes>
    </MemoryRouter>
  )
}

describe("CommandPalette", () => {
  it("filters as you type and navigates on Enter", () => {
    let closed = false
    renderPalette(() => { closed = true })
    const input = screen.getByRole("combobox")
    fireEvent.change(input, { target: { value: "resume" } })
    const options = screen.getAllByRole("option")
    expect(options[0]).toHaveTextContent("Resume")
    fireEvent.keyDown(input, { key: "Enter" })
    expect(screen.getByTestId("where")).toHaveTextContent("/resume")
    expect(closed).toBe(true)
  })

  it("finds projects by name and shows an empty state", () => {
    renderPalette()
    const input = screen.getByRole("combobox")
    fireEvent.change(input, { target: { value: "zukko crm" } })
    expect(screen.getAllByRole("option")[0]).toHaveTextContent("Zukko CRM")
    fireEvent.change(input, { target: { value: "qqqqqqqq" } })
    expect(screen.queryAllByRole("option")).toHaveLength(0)
    expect(screen.getByText("Nothing found")).toBeInTheDocument()
  })

  it("moves the selection with the arrow keys and closes on Escape", () => {
    let closed = false
    renderPalette(() => { closed = true })
    const input = screen.getByRole("combobox")
    expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true")
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true")
    fireEvent.keyDown(input, { key: "Escape" })
    expect(closed).toBe(true)
  })
})

describe("Testimonials", () => {
  it("renders nothing without entries", () => {
    const { container } = render(<MemoryRouter><Testimonials items={[]} /></MemoryRouter>)
    expect(container).toBeEmptyDOMElement()
  })

  it("shows quotes in the current language with an initials avatar", () => {
    render(
      <MemoryRouter>
        <Testimonials items={[{ name: "Jane Doe", role: "CEO", quote: { en: "Great work", uz: "Zo'r" } }]} />
      </MemoryRouter>
    )
    expect(screen.getByText("Great work")).toBeInTheDocument()
    expect(screen.getByText("JD")).toBeInTheDocument()
  })
})
