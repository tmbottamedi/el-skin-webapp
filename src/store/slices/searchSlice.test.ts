import searchReducer, { setTerm } from "./searchSlice";

describe("searchSlice", () => {
  it("deve retornar o estado inicial com termo vazio", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toEqual({
      term: "",
    });
  });

  it("deve atualizar o termo de busca", () => {
    const state = searchReducer(undefined, setTerm("Sérum"));
    expect(state.term).toBe("Sérum");
  });
});
