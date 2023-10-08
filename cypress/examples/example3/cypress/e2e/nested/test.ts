describe("test", () => {
  it("should work", () => {
    (cy as any).getDataCy("one").click()
  })

  it("should also work", () => {
    (cy as any).getDataCy("two").focus()
  })
})