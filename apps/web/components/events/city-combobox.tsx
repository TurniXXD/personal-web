"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, MapPin, X } from "lucide-react";
import { foldText, type EventCity } from "@/lib/events/event-filters";

export type CityOption = { value: EventCity; label: string };

type CityComboboxProps = {
  id: string;
  /** Selected city; `null` means every city. */
  value: EventCity | null;
  options: readonly CityOption[];
  labels: {
    placeholder: string;
    allCities: string;
    noResults: string;
    clear: string;
  };
  onChange: (value: EventCity | null) => void;
};

type ListItem = { value: EventCity | null; label: string };

const inputClasses =
  "min-h-11 w-full min-w-0 rounded-[0.7rem] border border-[#dce2f5] bg-background py-[0.6rem] pl-9 text-[0.84rem] leading-normal text-ink transition-colors duration-150 hover:border-primary focus-visible:border-primary focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#5f6cff40]";

/**
 * Autocomplete select (WAI-ARIA combobox with a listbox popup). Typing narrows
 * the fixed city list; only an offered city or "every city" can be chosen.
 */
export function CityCombobox({
  id,
  value,
  options,
  labels,
  onChange,
}: CityComboboxProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";
  const [text, setText] = useState(selectedLabel);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filtering, setFiltering] = useState(false);

  // Follow external changes (URL navigation, reset) while not being edited.
  useEffect(() => {
    if (document.activeElement !== inputRef.current) setText(selectedLabel);
  }, [selectedLabel]);

  const query = filtering ? foldText(text) : "";
  const items: ListItem[] = [
    ...(query ? [] : [{ value: null, label: labels.allCities }]),
    ...options.filter(
      (option) =>
        !query ||
        foldText(option.label).includes(query) ||
        option.value.includes(query),
    ),
  ];
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const optionId = (index: number) => `${listId}-option-${index}`;

  const openList = () => {
    setOpen(true);
    setActiveIndex(
      Math.max(
        items.findIndex((item) => item.value === value),
        0,
      ),
    );
  };

  const close = () => {
    setOpen(false);
    setFiltering(false);
  };

  const select = (item: ListItem) => {
    setText(item.value ? item.label : "");
    close();
    if (item.value !== value) onChange(item.value);
  };

  // Leaving the field commits an exact name match, otherwise restores the
  // current selection so the input never shows an unapplied value.
  const commitOrRevert = () => {
    const folded = foldText(text);
    if (!folded) {
      if (value !== null) onChange(null);
      setText("");
    } else {
      const match = options.find(
        (option) =>
          foldText(option.label) === folded || option.value === folded,
      );
      if (match) {
        setText(match.label);
        if (match.value !== value) onChange(match.value);
      } else {
        setText(selectedLabel);
      }
    }
    close();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((safeIndex + 1) % items.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((safeIndex - 1 + items.length) % items.length);
        break;
      case "Enter":
        // Choosing an option must not submit the surrounding filter form.
        if (open && items[safeIndex]) {
          event.preventDefault();
          select(items[safeIndex]);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setText(selectedLabel);
          close();
        }
        break;
    }
  };

  return (
    <div className="relative min-w-0">
      <MapPin
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-muted"
      />
      <input
        ref={inputRef}
        id={id}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && items.length ? optionId(safeIndex) : undefined
        }
        autoComplete="off"
        spellCheck={false}
        placeholder={labels.placeholder}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setFiltering(true);
          setOpen(true);
          setActiveIndex(0);
        }}
        onClick={() => (open ? close() : openList())}
        onBlur={commitOrRevert}
        onKeyDown={onKeyDown}
        className={`${inputClasses} ${value ? "pr-16" : "pr-9"}`}
      />
      {value ? (
        <button
          type="button"
          aria-label={labels.clear}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => select({ value: null, label: "" })}
          className="absolute top-1/2 right-8 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-muted transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-[3px] focus-visible:outline-[#5f6cff40]"
        >
          <X size={14} aria-hidden="true" />
        </button>
      ) : null}
      <ChevronDown
        size={16}
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      />
      <ul
        id={listId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        hidden={!open}
        className="absolute top-full right-0 left-0 z-20 m-0 mt-1.5 grid max-h-64 list-none gap-0.5 overflow-y-auto rounded-[0.9rem] border border-[#dfe4f8] bg-white p-1.5 shadow-[0_20px_55px_rgba(39,48,100,0.16)]"
      >
        {items.length ? (
          items.map((item, index) => {
            const selected = item.value === value;
            return (
              <li
                key={item.value ?? "all"}
                id={optionId(index)}
                role="option"
                aria-selected={selected}
                data-active={index === safeIndex ? "true" : undefined}
                // Keep focus in the input so blur does not cancel the choice.
                onMouseDown={(event) => event.preventDefault()}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => select(item)}
                className="flex min-h-10 cursor-pointer items-center justify-between gap-2 rounded-[0.6rem] px-3 text-[0.84rem] text-[#313a5f] data-[active=true]:bg-[#f3f4ff] data-[active=true]:text-primary aria-selected:font-bold"
              >
                {item.label}
                {selected ? (
                  <Check
                    size={14}
                    aria-hidden="true"
                    className="text-primary"
                  />
                ) : null}
              </li>
            );
          })
        ) : (
          <li
            role="presentation"
            className="px-3 py-2 text-[0.8rem] text-ink-muted"
          >
            {labels.noResults}
          </li>
        )}
      </ul>
    </div>
  );
}
