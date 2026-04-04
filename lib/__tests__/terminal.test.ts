import {
  executeTerminalCommand,
  getTerminalSuggestions,
} from "@/lib/terminal";

describe("getTerminalSuggestions", () => {
  it("returns no suggestions for blank input", () => {
    expect(getTerminalSuggestions("   ")).toEqual([]);
  });

  it("suggests terminal commands that match the query", () => {
    expect(getTerminalSuggestions("he")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "help",
          value: "help",
        }),
      ]),
    );
  });

  it("suggests route commands for matching section queries", () => {
    expect(getTerminalSuggestions("wor")).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "open work",
        }),
      ]),
    );
  });

  it("caps the suggestion list", () => {
    expect(getTerminalSuggestions("o")).toHaveLength(8);
  });
});

describe("executeTerminalCommand", () => {
  it("returns a prompt for empty input", () => {
    expect(executeTerminalCommand("   ")).toEqual({
      type: "output",
      output: ["Awaiting input. Type `help` or `list`."],
    });
  });

  it("returns the help output", () => {
    expect(executeTerminalCommand("help")).toEqual(
      expect.objectContaining({
        type: "output",
        output: expect.arrayContaining(["Available commands:", "- help", "- list"]),
      }),
    );
  });

  it("lists the available clusters", () => {
    expect(executeTerminalCommand("list")).toEqual({
      type: "output",
      output: [
        "About: cluster about",
        "Work: cluster work",
        "Capabilities: cluster skills",
        "Contact: cluster contact",
      ],
    });
  });

  it("clears the terminal history", () => {
    expect(executeTerminalCommand("clear")).toEqual({
      type: "clear",
      output: [],
    });
  });

  it("focuses a section for open commands", () => {
    expect(executeTerminalCommand("open work")).toEqual({
      type: "focus",
      target: "work",
      output: ["Focusing work cluster"],
    });
  });

  it("supports cd when focusing sections", () => {
    expect(executeTerminalCommand("cd home")).toEqual({
      type: "focus",
      target: "about",
      output: ["Focusing about cluster"],
    });
  });

  it("supports capabilities as an alias for the skills section", () => {
    expect(executeTerminalCommand("open capabilities")).toEqual({
      type: "focus",
      target: "skills",
      output: ["Focusing capabilities cluster"],
    });
  });

  it("reports unknown targets", () => {
    expect(executeTerminalCommand("open missing")).toEqual({
      type: "output",
      output: ["Unknown target: missing", "Use `list` to inspect clusters."],
    });
  });

  it("reports unsupported commands", () => {
    expect(executeTerminalCommand("launch work")).toEqual({
      type: "output",
      output: ["Unknown command: launch work", "Type `help` for supported commands."],
    });
  });
});
